/**
 * @typedef Params
 * * @property {boolean} [defaultOpen]
 * @property {boolean} [disabled]
 * @property {boolean} [open]
 * @property {(value: boolean) => void} [onChange]
 */

import { nanoid } from "nanoid";
import { addListener, getElementByQuery, setAttributes } from "./_helpers";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} [params]
 */
export function collapsible(node, params) {
  const id = nanoid();
  let {
    defaultOpen = false,
    open = false,
    disabled = false,
    onChange = undefined,
  } = params ?? {};

  const trigger = node.querySelector('[data-type="trigger"]');

  const content = getElementByQuery(
    node,
    '[data-type="content"]',
    'A tag with the attribute `[data-type="content"]` is required for the collapsible action to function'
  );

  /** Setup */
  setAttributes(trigger, { "aria-controls": id });
  setAttributes(content, { id });
  updateStateAttributes(open || defaultOpen);

  /** @param {Boolean} open */
  function updateStateAttributes(open) {
    setAttributes(trigger, {
      "aria-expanded": open ? "true" : "false",
      "data-state": open ? "open" : "closed",
      "data-disabled": disabled ? "true" : false,
    });

    setAttributes(content, {
      hidden: open ? false : "",
      "data-state": open ? "open" : "closed",
    });
  }

  /** Events */
  const unsub = [addListener(trigger, "click", onTriggerClick)];

  /** @param {Event} e */
  function onTriggerClick(e) {
    if (disabled || !e.target || !(e.target instanceof HTMLElement)) return;

    let expanded = e.target.getAttribute("aria-expanded") === "true";

    setAttributes(trigger, {
      "aria-expanded": expanded ? "false" : "true",
      "data-state": expanded ? "closed" : "open",
    });

    setAttributes(content, {
      hidden: expanded ? "" : false,
      "data-state": expanded ? "closed" : "open",
    });

    onChange && onChange(!expanded);
  }

  return {
    /** @param {Params} [params] */
    update(params) {
      let {
        open: updatedOpen = false,
        disabled: updatedDisabled = false,
        onChange: updatedOnChange = undefined,
      } = params ?? {};

      disabled = updatedDisabled;
      onChange = updatedOnChange;

      /**
       * Special check to ensure we fire the onChange event only when the open
       * value has changed. This prevents unexpected function firing for other params
       * like disabled and the onChange event itself
       *
       */
      if (updatedOpen !== open) {
        onChange && onChange(updatedOpen);
        updateStateAttributes(updatedOpen);
        open = updatedOpen;
      }
    },
    destroy() {
      unsub.forEach((items) => items());
    },
  };
}
