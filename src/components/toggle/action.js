/**
 * @typedef ItemParams
 * @property {boolean} [value]
 */

import {
  addListener,
  getElementIndex,
  selectNext,
  selectPrevious,
} from "@components/anatomykit/helpers";

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
   */
  let enabled = false;
  let selected = 0;
  const keys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];

  function setup() {
    const [firstElement, ...rest] = Array.from(node.children);

    const firstItem = firstElement.querySelector("[aria-pressed]");

    if (firstItem) {
      firstItem.setAttribute("tabindex", "0");
    }

    rest.forEach((element) => {
      const elementItem = element.querySelector("[aria-pressed]");

      if (elementItem) {
        elementItem.setAttribute("tabindex", "-1");
      }
    });
  }

  setup();

  /** Events */
  const unsub = [
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(node, "focusin", onFocusIn),
    addListener(node, "click", onClickIn),
  ];

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key)) return;

    if (e.key === "ArrowLeft") {
      selected = selectPrevious(node.children, selected);
      updateChild(selected);
    }

    if (e.key === "ArrowRight") {
      selected = selectNext(node.children, selected);
      updateChild(selected);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (e.key === "Tab") {
      enabled = false;
    }
  }

  /** @param {Event} e */
  function onFocusIn(e) {
    if (!("target" in e)) return;

    if (!enabled) {
      enabled = true;
      updateChild(selected);
    }
  }

  /** @param {Event} e */
  function onClickIn(e) {
    if (!("target" in e)) return;

    /** @type {Element} */
    // @ts-expect-error
    const element = e.target;

    const position = getElementIndex(node, element);

    selected = position;
    enabled = true;
    updateChild(selected);
  }

  /** @param {number} selected */
  function updateChild(selected) {
    const items = node.children;
    const element = items[selected];

    if (element) {
      const elementItem = element.querySelector("[aria-pressed]");

      if (elementItem) {
        // @ts-expect-error we know our menuitem will be a button
        elementItem.focus();
      }
    }
  }

  return {
    /** @param {GroupParams} params */
    update(params) {},
    destroy() {
      unsub.forEach((item) => item());
    },
  };
}
