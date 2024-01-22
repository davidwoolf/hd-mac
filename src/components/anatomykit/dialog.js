import {
  addListener,
  getElementByQuery,
  setAttributes,
} from "@components/anatomykit/_helpers";
import { nanoid } from "nanoid";

/**
 *
 * @param {HTMLElement} node
 * @returns
 */
export function dialog(node) {
  /**
   * @TODO
   * - [ ] merge with dialog action
   * - [ ] cancel/action buttons
   * - [ ] options to dismiss on backdrop
   * - [ ] animation support
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */

  const id = nanoid();
  const dialogId = `dialog-${id}`;
  const dialogTitleId = `dialog-title-${id}`;
  const dialogDescriptionId = `dialog-description-${id}`;
  const button = getElementByQuery(node, '[aria-haspopup="dialog"]');
  /** @type {HTMLDialogElement} */
  // @ts-expect-error
  const dialog = getElementByQuery(node, "dialog");

  // optional items
  const title = dialog.querySelector("[data-title]");
  const description = dialog.querySelector("[data-description]");

  setAttributes(button, {
    "data-controls": dialogId,
  });

  setAttributes(dialog, {
    id: dialogId,
    "aria-labelledby": title ? dialogTitleId : false,
    "aria-describedby": description ? dialogDescriptionId : false,
  });

  if (title) {
    setAttributes(title, {
      id: dialogTitleId,
      "data-title": false,
    });
  }

  if (description) {
    setAttributes(description, {
      id: dialogDescriptionId,
      "data-description": false,
    });
  }

  const unsub = [
    addListener(button, "click", onButtonClick),
    addListener(dialog, "click", onDialogClick),
    addListener(dialog, "close", onDialogClose),
  ];

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
    setAttributes(button, {
      "aria-expanded": "false",
    });
  }

  function onButtonClick() {
    dialog && dialog.showModal();
    setAttributes(button, {
      "aria-expanded": "true",
    });
  }

  return {
    destroy() {
      unsub.forEach((item) => item());
    },
  };
}
