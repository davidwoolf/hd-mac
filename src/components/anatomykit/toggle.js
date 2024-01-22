/**
 * @typedef ItemParams
 * @property {boolean} [value]
 */

import {
  addListener,
  getElementIndex,
  selectNext,
  selectPrevious,
  setAttributes,
} from "@components/anatomykit/_helpers";

/**
 *
 * @param {HTMLElement} node
 * @param {ItemParams} params
 */
export function toggle(node, params) {
  /**
   * @TODO
   * - [ ] disabled
   */

  let scopedValue =
    "value" in params && params.value !== undefined ? params.value : false;

  node.setAttribute("aria-pressed", String(scopedValue));

  node.addEventListener("click", onClick);

  function onClick() {
    scopedValue = !scopedValue;

    node.setAttribute("aria-pressed", String(scopedValue));
  }

  return {
    /** @param {ItemParams} params */
    update(params) {
      scopedValue =
        "value" in params && params.value !== undefined ? params.value : false;
    },
    destroy() {
      node.removeEventListener("click", onClick);
    },
  };
}

/**
 * @typedef GroupParams
 * @property {boolean} [value]
 */

/**
 *
 * @param {HTMLElement} node
 * @param {GroupParams} params
 */
export function togglegroup(node, params) {
  /**
   * @TODO
   * - [ ] orientation
   * - [ ] direction
   * - [ ] looping
   * - [ ] rovingFocus
   * - [ ] allow multiple
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */
  let enabled = false;
  let selected = 0;
  const keys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];

  Array.from(node.children).forEach((item, index) => {
    const element = item.querySelector("[aria-pressed]");
    setAttributes(element, {
      tabindex: index === 0 ? 0 : -1,
    });
  });

  setAttributes(node, {
    tabindex: 0,
  });

  /** Events */
  const unsub = [
    addListener(window, "pointerup", onPointerUp),
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(node, "focusin", onFocusIn),
    addListener(node, "click", onClick),
  ];

  function onPointerUp() {
    enabled = false;
  }

  function onClick() {
    enabled = true;
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key)) return;

    if (e.key === "ArrowLeft") {
      selected = selectPrevious(node.children, selected);
      updateSelection(selected);
    }

    if (e.key === "ArrowRight") {
      selected = selectNext(node.children, selected);
      updateSelection(selected);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (!enabled) return;
    if (e.key === "Tab") {
      enabled = false;
      setAttributes(node, {
        tabindex: -1,
      });

      setTimeout(() => {
        setAttributes(node, {
          tabindex: 0,
        });
      }, 1);
    }
  }

  /** @param {Event} e */
  function onFocusIn(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    enabled = true;
    selected = getElementIndex(node, e.target);

    updateSelection(selected > -1 ? selected : 0);
  }

  /** @param {Event} e */
  // function onClickIn(e) {
  //   if (!("target" in e)) return;

  //   /** @type {Element} */
  //   // @ts-expect-error
  //   const element = e.target;

  //   const position = getElementIndex(node, element);

  //   selected = position;
  //   enabled = true;
  //   updateSelection(selected);
  // }

  /** @param {number} selected */
  function updateSelection(selected) {
    Array.from(node.children).forEach((item, index) => {
      /** @type {HTMLElement | null} */
      const element = item.querySelector("[aria-pressed]");

      if (!element) return;
      if (index === selected) {
        setAttributes(element, {
          tabindex: false,
        });

        setTimeout(() => {
          element.focus();
        });
      } else {
        setAttributes(element, {
          tabindex: -1,
        });
      }
    });
  }

  return {
    /** @param {GroupParams} params */
    update(params) {},
    destroy() {
      unsub.forEach((item) => item());
    },
  };
}
