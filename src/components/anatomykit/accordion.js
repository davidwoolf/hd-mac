/**
 * @typedef Params
 * @property {boolean} [value]
 */

import {
  addListener,
  getElementIndex,
  selectNext,
  selectPrevious,
} from "@components/anatomykit/_helpers";
import { nanoid } from "nanoid";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function accordion(node, params) {
  /**
   * @TODO
   * - [ ] multiple
   * - [ ] orientation
   * - [ ] disabled
   * - [ ] disabled items
   * - [ ] callback hooks
   */

  const keys = ["ArrowDown", "ArrowUp"];
  let enabled = false;
  let selected = 0;

  /** @type {(() => void)[]} */
  let triggerUnsubs = [];

  function setup() {
    Array.from(node.children).forEach((element, index) => {
      let trigger;

      /** @type {HTMLElement} */
      // @ts-expect-error
      const title = element.querySelector(':not([role="region"])');
      /** @type {HTMLElement} */
      // @ts-expect-error
      const contents = element.querySelector('[role="region"]');

      if (!contents) {
        throw new Error(
          "each accordion item requires a content element with the role of 'region'"
        );
      }

      if (!title) {
        throw new Error(
          "each accordion item requires a title element, which can be any element but must not include a role of 'region'"
        );
      }

      if (title.nodeName === "BUTTON") {
        trigger = title;
      } else {
        trigger = title.querySelector("button");
      }

      if (!trigger) {
        throw new Error("each accordion title requires a button element");
      }

      const triggerId = nanoid();
      const contentId = nanoid();

      if (index === 0) {
        element.setAttribute("data-state", "open");

        trigger.setAttribute("tabindex", "0");
      } else {
        element.setAttribute("data-state", "closed");

        contents.setAttribute("hidden", "");
        trigger.setAttribute("tabindex", "-1");
      }

      triggerUnsubs = [...triggerUnsubs, addListener(trigger, "click", onTriggerClick)];
      trigger.setAttribute("id", triggerId);
      trigger.setAttribute("aria-controls", contentId);
      contents.setAttribute("id", contentId);
      contents.setAttribute("aria-labelledby", triggerId);
    });
  }

  setup();

  /** Events */
  const unsub = [
    addListener(window, "pointerup", onPointerUp),
    addListener(window, "keyup", onKeyUp),
    addListener(window, "keydown", onKeyDown),
    addListener(node, "focusin", onFocusIn),
  ];

  function onPointerUp() {
    enabled = false;
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key)) return;

    if (e.key === "ArrowUp") {
      selected = selectPrevious(node.children, selected);
      updateTrigger(selected);
    }

    if (e.key === "ArrowDown") {
      selected = selectNext(node.children, selected);
      updateTrigger(selected);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (e.key === "Tab") {
      enabled = false;
    }
  }

  function onFocusIn() {
    enabled = true;
  }

  /** @param {Event} e */
  function onTriggerClick(e) {
    if (!e.target) return;

    /** @type {Element} */
    // @ts-expect-error
    const target = e.target;

    const id = target.getAttribute("aria-controls");
    if (!id) return;

    const content = document.getElementById(id);
    if (!content) return;

    selected = getElementIndex(node, target);

    updateChild(selected);
  }

  /** Helpers */
  /** @param {number} selected */
  function updateChild(selected) {
    const items = node.children;
    const element = items[selected];

    if (element.getAttribute("data-state") === "open") {
      element.setAttribute("data-state", "closed");

      element.querySelector('[role="region"]').setAttribute("hidden", "");
    } else {
      element.setAttribute("data-state", "open");
      element.querySelector('[role="region"]').removeAttribute("hidden");

      Array.from(items)
        .filter((item) => item !== element)
        .forEach((item) => {
          item.setAttribute("data-state", "closed");
          item.querySelector('[role="region"]').setAttribute("hidden", "");
        });
    }
  }

  /** @param {number} selected */
  function updateTrigger(selected) {
    const items = node.children;
    const element = items[selected];

    /** @type {HTMLElement} */
    let trigger;

    if (element) {
      /** @type {HTMLElement} */
      // @ts-expect-error
      const title = element.querySelector(':not([role="region"])');

      if (title.nodeName === "BUTTON") {
        trigger = title;
      } else {
        trigger = title.querySelector("button");
      }

      trigger.focus();
    }
  }

  return {
    destroy() {
      unsub.forEach((item) => item());
      triggerUnsubs.forEach((item) => item());
    },
  };
}
