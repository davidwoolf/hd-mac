/**
 * @typedef Params
 * @property {boolean} value
 * @property {(value: boolean) => void} [onChange]
 */

/**
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function controlswitch(node, params) {
  /**
   * @TODO
   * - [ ] helper functions
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */

  const button = node.querySelector('[role="switch"]');

  if (!button) {
    throw new Error("a button with the role of `switch` needs to be inside of the label");
  }

  button.addEventListener("click", onClick);
  button.setAttribute("aria-checked", String(params.value));

  /** @param {boolean} value */
  function updateValue(value) {
    if (!button) return;

    params.onChange && params.onChange(value);
    button.setAttribute("aria-checked", String(value));
  }

  /** @param {Event} e */
  function onClick(e) {
    e.preventDefault();

    if (button) {
      if (button.getAttribute("aria-checked") === "true") {
        updateValue(false);
      } else {
        updateValue(true);
      }
    }
  }

  return {
    /** @param {ControlSwitchAction} params */
    update(params) {
      button.setAttribute("aria-checked", String(params.value));
    },
    destroy() {
      button.removeEventListener("click", onClick);
    },
  };
}
