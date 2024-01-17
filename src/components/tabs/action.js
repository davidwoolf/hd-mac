/**
 * @typedef Params
 * @property {boolean} [value]
 */

import {
  addListener,
  findNextChild,
  findPreviousChild,
  getElementIndex,
  selectNext,
  selectPrevious,
  setAttributes,
} from "@components/anatomykit/helpers";
import { nanoid } from "nanoid";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function tabs(node, params) {
  /**
   * @TODO
   * - [ ] orientation
   * - [ ] disabled
   * - [ ] disabled items
   * - [ ] callback hooks
   * - [ ] value (ie: not the first tab open)
   */

  const id = nanoid();
  const keys = ["ArrowLeft", "ArrowRight"];
  let enabled = false;
  let selected = 0;

  /** @type {(() => void)[]} */
  let triggerUnsubs = [];

  const nav = node.querySelector('[role="tablist"]');
  const panels = node.querySelectorAll('[role="tabpanel"]');

  if (!nav) {
    throw new Error('tab components require an element with the role of "tablist"');
  }

  setAttributes(nav, {
    tabIndex: "0",
    "aria-orientation": "horizontal",
  });

  nav.querySelectorAll("button").forEach((button, index) => {
    setAttributes(button, {
      "aria-selected": index === 0 ? true : false,
      "aria-controls": `panel-${id}-${button.getAttribute("data-value")}`,
      tabindex: "-1",
      id: `button-${id}-${button.getAttribute("data-value")}`,
    });

    triggerUnsubs = [...triggerUnsubs, addListener(button, "click", onTriggerClick)];
  });

  panels.forEach((element, index) => {
    setAttributes(element, {
      "data-state": index === 0 ? "open" : "closed",
      tabindex: 0,
      id: `panel-${id}-${element.getAttribute("data-value")}`,
      "aria-label": `button-${id}-${element.getAttribute("data-value")}`,
      hidden: index === 0 ? false : true,
    });
  });

  /** Events */
  const unsub = [
    addListener(window, "pointerup", onPointerUp),
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(nav, "focusin", onFocusIn),
  ];

  function onPointerUp() {
    enabled = false;
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key) || !nav) return;

    if (e.key === "ArrowLeft") {
      const item = findPreviousChild(nav, nav.querySelector('[aria-selected="true"]'));
      updateNav(item);
      // updateState(selected);
    }

    if (e.key === "ArrowRight") {
      const item = findNextChild(nav, nav.querySelector('[aria-selected="true"]'));
      updateNav(item);
      // updateState(selected);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (e.key === "Tab") {
      enabled = false;
    }
  }

  function onFocusIn() {
    if (!enabled) {
      enabled = true;

      // @ts-expect-error
      nav.querySelector('[aria-selected="true"]').focus();
    }
  }

  /** @param {Event} e */
  function onTriggerClick(e) {
    if (!e.target) return;

    /** @type {HTMLElement} */
    // @ts-expect-error
    const target = e.target;

    const id = target.getAttribute("aria-controls");
    if (!id) return;

    const content = document.getElementById(id);
    if (!content) return;

    updateNav(target);
    updatePanel(content);
    enabled = true;
  }

  /** Helpers */
  /** @param {HTMLElement} element */
  function updatePanel(element) {
    const items = node.children;

    if (element.getAttribute("data-state") !== "open") {
      setAttributes(element, {
        "data-state": "open",
        hidden: false,
      });

      element.focus();

      Array.from(items)
        // exclude current item and the tablist
        .filter((item) => item !== element && item.getAttribute("role") !== "tablist")
        .forEach((item) => {
          setAttributes(item, {
            "data-state": "closed",
            hidden: true,
          });
        });
    }
  }

  /** @param {HTMLElement} element */
  function updateNav(element) {
    if (!nav) return;

    const items = nav.children;

    if (element.getAttribute("aria-selected") !== "true") {
      setAttributes(element, {
        "aria-selected": "true",
        tabindex: 0,
      });

      setTimeout(() => {
        element.focus();
      });

      Array.from(items)
        // exclude current item and the tablist
        .filter((item) => item !== element)
        .forEach((item) => {
          setAttributes(item, {
            "aria-selected": false,
            tabindex: -1,
          });
        });
    }
  }

  return {
    destroy() {
      unsub.forEach((item) => item());
      triggerUnsubs.forEach((item) => item());
    },
  };
}
