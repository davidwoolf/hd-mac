/**
 * @typedef Params
 * @property {(status: "success" | "error", src: string | null) => void} [onComplete]
 */

import { addListener, getElementByQuery, setAttributes } from "./_helpers";

/**
 *
 * @param {HTMLElement} node
 * @param {Params} [params]
 */
export function avatar(node, params) {
  /**
   * @TODO
   * - [ ] callback hooks
   */

  const image = node.querySelector("img");
  const fallback = getElementByQuery(
    node,
    ":not(img)",
    "Avatars require fallback content outside of the image"
  );

  /** No image indicates just a fallback, which doesn't require any additional checks */
  if (!image) return;

  const unsub = [
    addListener(image, "load", onImageLoad),
    addListener(image, "error", onImageError),
  ];

  /**
   *
   * @param {"success" | "error"} status
   * @param {string | null} src
   */
  function onComplete(status, src) {
    if (params && "onComplete" in params && params.onComplete !== undefined) {
      params.onComplete(status, src);
    }
  }

  /** @param {Event} e */
  function onImageLoad(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    setAttributes(image, {
      hidden: false,
    });

    node.removeChild(fallback);

    onComplete("success", e.target.getAttribute("src"));
  }

  /** @param {Event} e */
  function onImageError(e) {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    onComplete("error", e.target.getAttribute("src"));
  }

  return {
    destroy() {
      unsub.forEach((items) => items());
    },
  };
}
