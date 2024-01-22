import { addListener, getElementByQuery, setAttributes } from "./_helpers";

/**
 * @typedef Params
 * @property {number} [value]
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
  /**
   * @TODO
   * - [ ] events
   *    - [ ] arrows: left|right|up|down
   *    - [ ] home|end
   *    - [ ] page: up|down
   *    - [ ] shift + arrow
   *    - [ ] click/focus
   * - [ ] callback hooks
   * - [ ] [data-*] states
   * - [ ] elements
   *    - [ ] track
   *    - [ ] thumb
   *    - [ ] range
   * - [ ] vertical
   * - [ ] multiple
   */
  // aria-valuemin="0"
  // aria-valuemax="100"
  // aria-valuenow="50"
  // aria-orientation="horizontal"
  // data-orientation="horizontal"
  // tabindex="0"

  let {
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
  /** @type {Coordinates} */
  let start = {
    x: 0,
    y: 0,
  };
  /** @type {Coordinates} */
  let movement = {
    x: 0,
    y: 0,
  };

  const thumb = getElementByQuery(node, '[role="slider"]');

  setAttributes(thumb, {
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-orientation": orientation,
    "aria-valuenow": value,
    tabindex: "0",
  });

  const unsub = [
    addListener(window, "pointermove", onPointerMove),
    addListener(window, "pointerup", onPointerUp),
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(thumb, "pointerdown", onThumbDown),
    addListener(thumb, "focus", onThumbFocus),
    addListener(thumb, "blur", onThumbBlur),
  ];

  /** @param {PointerEvent} e */
  function onThumbDown(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    mouseenabled = true;
    start = {
      x: e.screenX,
      y: e.screenY,
    };
  }

  /** @param {PointerEvent} e */
  function onPointerUp(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    mouseenabled = false;
    movement = {
      x: 0,
      y: 0,
    };
  }

  /** @param {PointerEvent} e */
  function onPointerMove(e) {
    if (!mouseenabled) return;

    movement = {
      x: e.screenX,
      y: e.screenX,
    };

    updateValue(start, movement);
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (!keyboardenabled) return;

    if (e.key === "Shift") {
      valuemodifier = 10;
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!keyboardenabled) return;

    let deltaValue = value;

    if (e.key === "Shift") {
      valuemodifier = 1;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      deltaValue = value - step * valuemodifier;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      deltaValue = value + step * valuemodifier;
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

    if (deltaValue < min) {
      deltaValue = min;
    }

    if (deltaValue > max) {
      deltaValue = max;
    }

    onChange && onChange(deltaValue);
  }

  /**
   *
   * @param {Coordinates} start
   * @param {Coordinates} delta
   */
  function updateValue(start, delta) {
    const x = (delta.x - start.x) / node.getBoundingClientRect().width;
    // const y = delta.y - start.y

    let deltaValue = value + value * x;

    if (deltaValue <= value - step) {
      onChange && onChange(value - step);
    }

    if (deltaValue >= value + step) {
      onChange && onChange(value + step);
    }
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

      if (updatedValue) {
        value = updatedValue;
      }

      onChange = updatedOnChange;
    },
    destroy() {
      unsub.forEach((items) => items());
    },
  };
}
