/**
 * @typedef Params
 * @property {boolean} [value]
 */

import {
  addListener,
  findNextChild,
  findPreviousChild,
  getElementById,
  getElementByQuery,
  setAttributes,
} from "@components/anatomykit/_helpers";
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
   * - [ ] [data-*] states
   * - [ ] value (ie: not the first tab open)
   */

  const id = nanoid();
  const keys = ["ArrowLeft", "ArrowRight"];
  let enabled = false;

  /** @type {(() => void)[]} */
  let triggerUnsubs = [];

  const nav = getElementByQuery(node, '[role="tablist"]');
  const panels = node.querySelectorAll('[role="tabpanel"]');

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
      const content = getElementById(item.getAttribute("aria-controls"));
      updateNav(item);
      updatePanel(content);
    }

    if (e.key === "ArrowRight") {
      const item = findNextChild(nav, nav.querySelector('[aria-selected="true"]'));
      const content = getElementById(item.getAttribute("aria-controls"));
      updateNav(item);
      updatePanel(content);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (!enabled) return;

    if (e.key === "Tab") {
      enabled = false;

      setAttributes(nav, {
        tabindex: -1,
      });

      setTimeout(() => {
        setAttributes(nav, {
          tabindex: 0,
        });
      }, 1);
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
    const content = getElementById(target.getAttribute("aria-controls"));

    updateNav(target);
    updatePanel(content);
    enabled = true;
  }

  /** Helpers */
  /** @param {Element | null} element */
  function updatePanel(element) {
    if (!element || !(element instanceof HTMLElement)) return;

    const items = node.children;

    // if (element.getAttribute("data-state") !== "open") {
    setAttributes(element, {
      "data-state": "open",
      hidden: false,
    });

    Array.from(items)
      // exclude current item and the tablist
      .filter((item) => item !== element && item.getAttribute("role") !== "tablist")
      .forEach((item) => {
        setAttributes(item, {
          "data-state": "closed",
          hidden: true,
        });
      });
    // }
  }

  /** @param {Element} element */
  function updateNav(element) {
    if (!nav || !(element instanceof HTMLElement)) return;

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
