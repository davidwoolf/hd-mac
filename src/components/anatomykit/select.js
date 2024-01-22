/**
 * @typedef Params
 * @property {boolean} [value]
 */

import {
  addListener,
  getElementByQuery,
  selectNext,
  selectPrevious,
  setAttributes,
} from "@components/anatomykit/_helpers";
import { nanoid } from "nanoid";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function select(node, params) {
  /**
   * @TODO
   * - [ ] value
   * - [ ] onChange
   * - [ ] direction
   * - [ ] name
   * - [ ] disabled
   * - [ ] required
   * - [ ] placeholder
   * - [ ] callback hooks
   *
   */

  let enabled = false;
  let selected = 0;
  const id = nanoid();

  const trigger = getElementByQuery(node, '[role="combobox"]');
  const list = getElementByQuery(node, '[role="listbox"]');
  const groups = node.querySelectorAll('[role="group"]');
  const options = node.querySelectorAll('[role="option"]');

  /* Events */

  const unsub = [
    addListener(window, "pointerup", onWindowClick),
    addListener(window, "keydown", onWindowKeyDown),
    addListener(window, "keyup", onWindowKeyUp),
    addListener(trigger, "click", onClick),
    addListener(trigger, "keyup", onTriggerKeyUp),
    addListener(list, "pointermove", onListMove),
    addListener(list, "pointerleave", onListLeave),
  ];

  /* Setup */
  setAttributes(trigger, {
    "aria-controls": `list-${id}`,
    "aria-expanded": "false",
    "aria-autocomplete": "none",
  });

  setAttributes(list, {
    id: `list-${id}`,
    tabindex: -1,
    "data-state": "closed",
  });

  // groups are optional, if none are present, this iteration will do nothing
  groups.forEach((group) => {
    const label = getElementByQuery(group, ':not([role="option"]');
    const id = `group-label-${nanoid()}`;

    setAttributes(group, {
      "aria-labelledby": id,
    });

    setAttributes(label, {
      id: id,
    });
  });

  options.forEach((option) => {
    setAttributes(option, {
      "aria-selected": "false",
      "data-state": "unchecked",
      tabindex: -1,
    });
  });

  function onWindowClick() {
    cleanup();
  }

  /** @param {KeyboardEvent} e */
  function onWindowKeyDown(e) {
    if (e.key === "Tab" && enabled) {
      cleanup();
    }
  }

  /** @param {KeyboardEvent} e */
  function onWindowKeyUp(e) {
    if (!enabled) return;

    if (e.key === "Escape") {
      cleanup();
    }

    if (e.key === "ArrowUp") {
      selected = selectPrevious(options, selected);
      updateOption(selected);
    }

    if (e.key === "ArrowDown") {
      selected = selectNext(options, selected);
      updateOption(selected);
    }

    // " " is the same as Space
    if (e.key === " " || e.key === "Enter") {
      // onChange highlighted
      cleanup();
    }
  }

  function onClick() {
    setup();
  }

  /** @param {KeyboardEvent} e */
  function onTriggerKeyUp(e) {
    if (e.key === "ArrowDown" && !enabled) {
      setup();
    }
  }

  /** @param {Event} e */
  function onListMove(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    /**
     * This logic safely works because descendants
     * of role="option" are always set as presentational
     */
    if (e.target.getAttribute("role") !== "option") {
      selected = -1;
    } else {
      selected = Array.from(options).findIndex((item) => {
        return item === e.target;
      });
    }

    updateOption(selected);
  }

  /** @param {Event} e */
  function onListLeave(e) {
    selected = -1;
    updateOption(selected);
  }

  /** @param {Number} selected */
  function updateOption(selected) {
    options.forEach((option, index) => {
      if (selected === index) {
        setAttributes(option, {
          "data-highlighted": true,
        });
      } else {
        setAttributes(option, {
          "data-highlighted": false,
        });
      }
    });
  }

  function setup() {
    enabled = true;

    setAttributes(list, {
      hidden: false,
      "data-state": "open",
    });

    options.forEach((option, index) => {
      if (index === 0) {
        setAttributes(option, {
          "data-highlighted": true,
        });
      }
    });
  }

  function cleanup() {
    enabled = false;
    setAttributes(list, {
      hidden: "",
      "data-state": "closed",
    });
  }

  return {
    destroy() {
      unsub.forEach((item) => item());
    },
  };
}
