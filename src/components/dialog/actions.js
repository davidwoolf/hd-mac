import { nanoid } from "nanoid";

/**
 *
 * @param {Element | null} element
 * @param {string} attribute
 * @param {string} value
 */
function setAttribute(element, attribute, value) {
  if (!element) return;

  element.setAttribute(attribute, value);
}

/**
 *
 * @param {HTMLElement} node
 * @returns
 */
export function dialog(node) {
  const button = node.querySelector('[aria-haspopup="dialog"]');
  const dialog = node.querySelector("dialog");
  const dialogId = nanoid();

  if (!button && !dialog) {
    throw new Error("dialog action requires a button trigger and dialog!");
  }

  setAttribute(button, "data-controls", dialogId);
  setAttribute(dialog, "id", dialogId);

  // @ts-expect-error: we check above
  button.addEventListener("click", onButtonClick);
  // @ts-expect-error: we check above
  dialog.addEventListener("click", onDialogClick);
  // @ts-expect-error: we check above
  dialog.addEventListener("close", onDialogClose);

  /** @param {Event} e */
  function onDialogClick(e) {
    /**
     * enables dismissal when clicking the backdrop, which is technically
     * a part of the dialog itself. A sub container contains the styling of the "panel"
     * and clicking inside causes this logic to be false
     */
    if (e.target === dialog) {
      dialog && dialog.close();
    }
  }

  function onDialogClose() {
    setAttribute(button, "aria-expanded", "false");
  }

  function onButtonClick() {
    dialog && dialog.showModal();
    setAttribute(button, "aria-expanded", "true");
  }

  return {
    destroy() {},
  };
}
