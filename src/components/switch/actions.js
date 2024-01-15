/**
 * @typedef ControlSwitchAction
 * @property {boolean} value
 * @property {(value: boolean) => void} [onChange]
 */

/**
 * @param {HTMLElement} node
 * @param {ControlSwitchAction} params
 */
export function controlswitch(node, params) {
  let localValue = params.value;

  const button = node.querySelector('[role="switch"]');

  if (!button) {
    throw new Error("a button with the role of `switch` needs to be inside of the label");
  }

  node.addEventListener("pointerup", onPointerUp);
  button.setAttribute("aria-checked", String(localValue));

  /** @param {Event} e */
  function onPointerUp(e) {
    console.log("onclick");

    if (button) {
      if (button.getAttribute("aria-checked") === "true") {
        localValue = false;
        params.onChange && params.onChange(localValue);
        button.setAttribute("aria-checked", "false");
      } else {
        localValue = true;
        params.onChange && params.onChange(localValue);
        button.setAttribute("aria-checked", "true");
      }
    }
  }

  return {
    /** @param {ControlSwitchAction} params */
    update(params) {
      localValue = params.value;
    },
    destroy() {
      node.removeEventListener("pointerup", onPointerUp);
    },
  };
}
