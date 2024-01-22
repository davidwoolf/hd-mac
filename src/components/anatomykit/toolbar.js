/**
 * @typedef Params
 * @property {string} label
 */

import {
  addListener,
  getElementIndex,
  setAttributes,
} from "@components/anatomykit/_helpers";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function toolbar(node, params) {
  /**
   * @TODO
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */

  let enabled = false;
  let selected = 0;
  const actions = node.querySelectorAll("button");

  setAttributes(node, {
    "aria-orientation": "horizontal",
    "aria-label": params.label,
    tabindex: 0,
  });

  actions.forEach((action) => {
    setAttributes(action, {
      tabindex: -1,
    });
  });

  if (actions.length === 0) {
    throw new Error("toolbars should contain buttons");
  }

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
    if (!enabled) return;

    if (e.key === "ArrowLeft") {
      selected = selected > 0 ? selected - 1 : actions.length - 1;
      updateSelection(selected);
    }

    if (e.key === "ArrowRight") {
      selected = selected < actions.length - 1 ? selected + 1 : 0;
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

  /** @param {number} selected */
  function updateSelection(selected) {
    actions.forEach((action, index) => {
      if (index === selected) {
        setAttributes(action, {
          tabindex: false,
        });

        setTimeout(() => {
          action.focus();
        });
      } else {
        setAttributes(action, {
          tabindex: -1,
        });
      }
    });
  }

  return {
    destroy() {
      unsub.forEach((item) => item());
    },
  };
}
