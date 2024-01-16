import { tick } from "svelte";

/**
 * @typedef TooltipAction
 * @property {(value: boolean) => void} onChange
 * @property {number} [offset]
 * @property {"top-left" |  "top-center" |  "top-right" |  "bottom-left" |  "bottom-center" |  "bottom-right" |"left-top" | "left-center" |  "left-bottom" |  "right-top" |  "right-center" |  "right-bottom"} [position]
 */

/**
 *
 * @param {HTMLElement} node
 * @param {TooltipAction} params
 */
export function tooltip(node, params) {
  let focused = false;
  let scopedOffset = "offset" in params && params.offset ? params.offset : 0;
  let scopedPosition =
    "position" in params && params.position ? params.position : "top-center";

  // const tooltip = node.querySelector('[role="tooltip"]');

  window.addEventListener("keyup", onKeyUp);
  node.addEventListener("pointerenter", showTooltipOnPointerEnter);
  node.addEventListener("pointerleave", hideTooltipOnPointerLeave);
  node.addEventListener("focusin", showTooltipOnFocusIn);
  node.addEventListener("focusout", hideTooltipOnFocusOut);

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (e.key === "Escape") {
      params.onChange(false);
    }
  }

  function styleTooltip() {
    /** @type {HTMLElement | null} */
    const tooltip = node.querySelector('[role="tooltip"]');
    console.log(tooltip);

    if (!tooltip) return;

    const styles = getPlacement(scopedPosition);

    Object.entries(styles).forEach(([key, value]) => {
      // @ts-expect-error
      tooltip.style[key] = value;
    });
  }

  function showTooltipOnPointerEnter() {
    if (focused) return;

    params.onChange(true);
    tick();
    setTimeout(() => {
      styleTooltip();
    });
  }

  function showTooltipOnFocusIn() {
    focused = true;
    params.onChange(true);
    tick();
    setTimeout(() => {
      styleTooltip();
    });
  }

  function hideTooltipOnFocusOut() {
    focused = false;
    params.onChange(false);
  }

  function hideTooltipOnPointerLeave() {
    if (focused) return;

    params.onChange(false);
  }

  return {
    /** @param {TooltipAction} params */
    update(params) {
      scopedOffset = "offset" in params && params.offset ? params.offset : 0;
      scopedPosition =
        "position" in params && params.position ? params.position : "top-center";
    },
    destroy() {
      window.removeEventListener("keyup", onKeyUp);
      node.removeEventListener("pointerenter", showTooltipOnPointerEnter);
      node.removeEventListener("pointerleave", hideTooltipOnPointerLeave);
      node.removeEventListener("focusin", showTooltipOnFocusIn);
      node.removeEventListener("focusout", hideTooltipOnFocusOut);
    },
  };
}

/**
 * @param { "top-left" |  "top-center" |  "top-right" |  "bottom-left" |  "bottom-center" |  "bottom-right" |"left-top" |  "left-center" |  "left-bottom" |  "right-top" |  "right-center" |  "right-bottom" } position
 */
function getPlacement(position) {
  let styles = {
    position: "absolute",
    /** @TODO set limit and take block-size into consideration as well */
    "inline-size": "max-content",
  };

  switch (position) {
    case "top-left":
      return {
        ...styles,
        "inset-inline-start": 0,
        "inset-block-end": "100%",
      };
    case "top-center":
      return {
        ...styles,
        "inset-inline-start": "50%",
        "inset-block-end": "100%",
        transform: "translateX(-50%)",
      };
    case "top-right":
      return {
        ...styles,
        "inset-inline-end": 0,
        "inset-block-end": "100%",
      };
    case "bottom-left":
      return {
        ...styles,
        "inset-block-start": "100%",
        "inset-inline-start": 0,
      };
    case "bottom-center":
      return {
        ...styles,
        "inset-block-start": "100%",
        "inset-inline-start": "50%",
        transform: "translateX(-50%)",
      };
    case "bottom-right":
      return {
        ...styles,
        "inset-block-start": "100%",
        "inset-inline-end": 0,
      };
    case "left-top":
      return {
        ...styles,
        "inset-block-start": "0",
        "inset-inline-end": "100%",
      };
    case "left-center":
      return {
        ...styles,
        "inset-block-start": "50%",
        "inset-inline-end": "100%",
        transform: "translateY(-50%)",
      };
    case "left-bottom":
      return {
        ...styles,
        "inset-block-end": 0,
        "inset-inline-end": "100%",
      };
    case "right-top":
      return {
        ...styles,
        "inset-block-start": "0",
        "inset-inline-start": "100%",
      };
    case "right-center":
      return {
        ...styles,
        "inset-block-start": "50%",
        "inset-inline-start": "100%",
        transform: "translateY(-50%)",
      };
    case "right-bottom":
      return {
        ...styles,
        "inset-block-end": 0,
        "inset-inline-start": "100%",
      };
    default:
      throw new Error(`unsupported position: ${position}'`);
  }
}

export const role = "tooltip";
