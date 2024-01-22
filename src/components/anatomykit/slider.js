import {
  addListener,
  clamp,
  getElementByQuery,
  setAttributes,
  setStyles,
} from "./_helpers";

/**
 * @typedef Params
 * @property {number} [value]
 * @property {"ltr" | "rtl"} [dir]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [step]
 * @property {"horizontal" | "vertical"} [orientation]
 * @property {(value: number) => void} [onChange]
 *
 */

/**
 * @typedef Coordinates
 * @property {number} x
 * @property {number} y
 */

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function slider(node, params) {
  const keys = [
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "PageUp",
    "PageDown",
    "Shift",
    "Home",
    "End",
  ];

  let {
    dir = "ltr",
    min = 0,
    max = 100,
    step = 1,
    orientation = "horizontal",
    value = 0,
    onChange = undefined,
  } = params ?? {};

  let mouseenabled = false;
  let keyboardenabled = false;
  let valuemodifier = 1;

  const thumb = getElementByQuery(node, '[role="slider"]');
  const track = getElementByQuery(node, '[data-type="track"]');
  const range = getElementByQuery(node, '[data-type="range"]');

  function setup() {
    setStyles(node, {
      alignItems: "center",
      display: "flex",
      position: "relative",
      touchAction: "none",
      "-webkit-user-select": "none",
    });

    setAttributes(thumb, {
      "aria-orientation": orientation,
      tabindex: "0",
    });

    setStyles(thumb, {
      display: "block",
      position: "absolute",
      "inset-inline-start":
        orientation === "horizontal" ? "var(--akit-thumb-offset)" : "unset",
      "inset-block-end":
        orientation === "vertical" ? "var(--akit-thumb-offset)" : "unset",
      transform: orientation === "horizontal" ? "translateX(-50%)" : "translateY(50%)",
    });

    setStyles(track, {
      position: "relative",
    });

    setAttributes(node, {
      dir,
      "data-orientation": orientation,
    });

    setAttributes(track, {
      "data-orientation": orientation,
    });

    setAttributes(range, {
      "data-orientation": orientation,
    });

    setStyles(range, {
      "block-size": orientation === "horizontal" ? "100%" : "auto",
      "inline-size": orientation === "vertical" ? "100%" : "auto",
      position: "absolute",
      "inset-inline-end":
        orientation === "horizontal" ? "var(--akit-range-offset)" : "inherit",
      "inset-block-start": orientation === "vertical" ? "var(--akit-range-offset)" : 0,
      "inset-inline-start": 0,
      "inset-block-end": 0,
    });
  }

  function updateThumbValues() {
    setAttributes(thumb, {
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
    });

    const offsetValue = (value - min) / (max - min);
    const size =
      orientation === "horizontal"
        ? thumb.getBoundingClientRect().width / 2
        : thumb.getBoundingClientRect().height / 2;
    const offset = size * (offsetValue * 2) - size;

    setStyles(node, {
      "--akit-thumb-offset": `calc(${offsetValue * 100}% - ${offset}px)`,
      "--akit-range-offset": `calc(${100 - offsetValue * 100}% + ${offset}px)`,
    });
  }

  setup();
  updateThumbValues();

  const unsub = [
    addListener(window, "pointermove", onPointerMove),
    addListener(window, "pointerup", onPointerUp),
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(node, "pointerdown", onNodeDown),
    addListener(thumb, "pointerdown", onThumbDown),
    addListener(thumb, "focus", onThumbFocus),
    addListener(thumb, "blur", onThumbBlur),
  ];

  /** @param {PointerEvent} e */
  function onThumbDown(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    mouseenabled = true;
  }

  /** @param {PointerEvent} e */
  function onNodeDown(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    mouseenabled = true;

    updateValue({
      x: e.clientX,
      y: e.clientY,
    });
  }

  /** @param {PointerEvent} e */
  function onPointerUp(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    mouseenabled = false;
  }

  /** @param {PointerEvent} e */
  function onPointerMove(e) {
    if (!mouseenabled) return;

    updateValue({
      x: e.clientX,
      y: e.clientY,
    });
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (!keyboardenabled || !keys.includes(e.key)) return;

    let deltaValue = value;

    if (e.key === "Shift") {
      valuemodifier = 10;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      if (dir === "ltr") {
        deltaValue = value - step * valuemodifier;
      } else {
        deltaValue = value + step * valuemodifier;
      }
    }

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (dir === "ltr") {
        deltaValue = value + step * valuemodifier;
      } else {
        deltaValue = value - step * valuemodifier;
      }
    }

    if (e.key === "Home") {
      deltaValue = min;
    }

    if (e.key === "End") {
      deltaValue = max;
    }

    if (e.key === "PageDown") {
      deltaValue = value - step * 10;
    }

    if (e.key === "PageUp") {
      deltaValue = value + step * 10;
    }

    onChange && onChange(clamp(deltaValue, min, max));
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (e.key === "Shift") {
      valuemodifier = 1;
    }
  }

  /**
   *
   * @param {Coordinates} coordinates
   */
  function updateValue(coordinates) {
    const bounds = node.getBoundingClientRect();

    let percentage;

    if (orientation === "horizontal") {
      percentage = (coordinates.x - bounds.x) / bounds.width;

      if (dir === "rtl") {
        percentage = 1 - percentage;
      }
    } else {
      percentage = 1 - (coordinates.y - bounds.y) / bounds.height;

      console.log(percentage);
    }

    /**
     * say the max is 10, the step .1, and the percentage is .55:
     * 1 * .55 = .55
     * .55 / .1 = 5.5
     * Math.ceil(5.5) === 6
     * 6 * .1 = .6
     *
     * this ensures values are always clamped to a step value
     */
    const deltaValue = Math.ceil((max * percentage) / step) * step;

    onChange && onChange(clamp(deltaValue, min, max));
  }

  function onThumbFocus() {
    keyboardenabled = true;
  }

  function onThumbBlur() {
    keyboardenabled = false;
  }

  return {
    /** @param {Params} [params] */
    update(params) {
      let { value: updatedValue, onChange: updatedOnChange = undefined } = params ?? {};

      if (updatedValue !== undefined) {
        value = updatedValue;

        updateThumbValues();
      }

      onChange = updatedOnChange;
    },
    destroy() {
      unsub.forEach((items) => items());
    },
  };
}
