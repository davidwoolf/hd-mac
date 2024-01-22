import { nanoid } from "nanoid";

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

// let expanded = false;

// function toggleMenu() {
//   expanded = !expanded;
// }

/**
 *
 * @param {Record<string, string>} [selectors]
 * @returns
 */
function getMenuSelectors(selectors) {
  return {
    item: '[role="menuitem"]',
    highlighted: "data-highlighted",
    openMenu: '[data-open="true"]',
    ...(selectors ? selectors : {}),
  };
}

/**
 * @typedef Params
 * @property {boolean} enabled
 * @property {() => void} requestOpen
 * @property {() => void} requestClose
 * @property {Record<string, string>} [selectors]
 * @property {(firstItem: Element, rest: Element[]) => void} [setup]
 * @property {(node: Element, element: Element) => void} [updateChild]
 */

/**
 *
 * @param {HTMLElement} node
 * @param {Params} params
 */
export function menu(node, params) {
  /**
   * @TODO
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */

  // necessary to overwrite with new args on updates
  let enabled = params.enabled;
  let selected = -1;
  const keys = ["arrowdown", "arrowup", ...alphabet];
  const defaultSelectors = "selectors" in params ? params.selectors : undefined;
  let { item, highlighted, openMenu } = getMenuSelectors(defaultSelectors);

  /** Events */
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("keydown", onKeyDown);
  node.addEventListener("pointermove", onPointerMove);
  node.addEventListener("menubar-menu-request", onMenuBarRequest);

  /** @param {Event} e */
  function onPointerMove(e) {
    if (!e.target) return;

    /** @type {Node} */
    // @ts-expect-error we know the target will be a node (if it exists)
    const element = e.target;

    if (element) {
      const topLevelElement = getTopLevelChild(element);
      const position = getPosition(topLevelElement);

      selected = position;
      updateChild(selected);
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key.toLowerCase())) return;

    if (e.key === "ArrowDown") {
      selectNextChild();
    } else if (e.key === "ArrowUp") {
      selectPreviousChild();
    } else {
      findChildByKey(e.key);
    }
  }

  /** @param {Event} e */
  function onMenuBarRequest(e) {
    if ("detail" in e && e.detail === "open") {
      params.requestOpen();
    } else {
      selected = -1;
      params.requestClose();
    }
  }

  /** @param {Event} e */
  function onPointerUp(e) {
    if (!("target" in e)) return;

    /** @type {Element} */
    // @ts-expect-error we should have an element here
    const target = e.target;
    const topLevelElement = getTopLevelChild(target);
    const id = node.getAttribute("id");

    if (target.getAttribute("aria-controls") !== id) {
      selected = -1;
      params.requestClose();
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (e.key === "Escape" || e.key === "Tab") {
      selected = -1;
      params.requestClose();
    }
  }

  /** Internal helpers */

  /**  @param {number} selected */
  function updateChild(selected) {
    const items = node.children;
    const element = items[selected];

    if (element) {
      const highlightedItem = node.querySelector(`[${highlighted}]`);
      const elementButton = element.querySelector("button");

      if (highlightedItem) {
        highlightedItem.removeAttribute(highlighted);
      }

      element.setAttribute(highlighted, "");

      if (elementButton) {
        elementButton.focus();
      }
    }
  }

  function selectPreviousChild() {
    selected = selected > 0 ? selected - 1 : selected;

    updateChild(selected);
  }

  function selectNextChild() {
    const items = node.children;
    selected = selected < items.length - 1 ? selected + 1 : selected;

    updateChild(selected);
  }

  /** @param {Node} element */
  function getTopLevelChild(element) {
    if (!element.parentNode) {
      return element;
    }

    if (element.parentNode === node) {
      return element;
    }

    return getTopLevelChild(element.parentNode);
  }

  /** @param {Node} element */
  function getPosition(element) {
    return Array.from(node.children).findIndex((item) => {
      return item === element;
    });
  }

  /** @param {string} key */
  function findChildByKey(key) {
    const position = Array.from(node.children).findIndex((item) => {
      const itemButton = item.querySelector("button");

      if (itemButton) {
        return itemButton.innerText.charAt(0).toLowerCase() === key;
      } else {
        return -1;
      }
    });

    selected = position;
    updateChild(selected);
  }

  return {
    /**
     *
     * @param {{ enabled: boolean; keys: string[]}} params
     */
    update(params) {
      enabled = params.enabled;
    },
    destroy() {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("menubar-menu-request", onMenuBarRequest);
    },
  };
}

export const menuRole = "menu";
export const itemRole = "menuitem";

export function generateId() {
  return nanoid();
}
