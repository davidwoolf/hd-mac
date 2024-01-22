import {
  getElementIndex,
  selectNext,
  selectPrevious,
} from "@components/anatomykit/_helpers";

/**
 *
 * @param {Record<string, string>} [selectors]
 * @returns
 */
function getMenuBarSelectors(selectors) {
  return {
    item: '[role="menuitem"]',
    menu: '[role="menu"]',
    highlighted: "data-highlighted",
    openMenu: '[data-open="true"]',
    ...(selectors ? selectors : {}),
  };
}

/**
 * @typedef Params
 * @property {"horizontal" | "vertical"} [direction]
 * @property {Record<string, string>} [selectors]
 * @property {(firstItem: Element, rest: Element[]) => void} [setup]
 * @property {(node: Element, element: Element) => void} [updateChild]
 */

/**
 *
 * @param {Element} node
 * @param {Params} [params]
 */
export function menubar(node, params) {
  /**
   * @TODO
   * - [ ] helper functions
   * - [ ] callback hooks
   * - [ ] [data-*] states
   */

  /* Args */
  const eventName = "menubar-menu-request";
  const keys = ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"];
  const defaultSelectors = params && "selectors" in params ? params.selectors : undefined;

  let { item, menu, highlighted, openMenu } = getMenuBarSelectors(defaultSelectors);
  let enabled = false;
  let selected = 0;

  function setup() {
    const [firstElement, ...rest] = Array.from(node.children);

    if (params && "setup" in params && params.setup) {
      params.setup(firstElement, rest);
    }

    const firstItem = firstElement.querySelector(item);

    if (firstItem) {
      firstItem.setAttribute("tabindex", "0");
    }

    rest.forEach((element) => {
      const elementItem = element.querySelector(item);

      if (elementItem) {
        elementItem.setAttribute("tabindex", "-1");
      }
    });
  }

  setup();

  /** Event listeners */
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("keydown", onKeyDown); // keydown is important because we want this to fire before `keyup` or `focusin`
  window.addEventListener("keyup", onKeyUp);
  node.addEventListener("click", onClickIn);
  node.addEventListener("focusin", onFocusIn);
  node.addEventListener("pointermove", onPointerMove);

  function onPointerUp() {
    enabled = false;
  }

  /** @param {KeyboardEvent} e */
  function onKeyDown(e) {
    if (e.key === "Tab") {
      enabled = false;
    }
  }

  /** @param {KeyboardEvent} e */
  function onKeyUp(e) {
    if (!enabled || !keys.includes(e.key)) return;

    if (params && "direction" in params && params.direction === "vertical") {
      if (e.key === "ArrowUp") {
        selected = selectPrevious(node.children, selected);
        updateChild(selected);
      }

      if (e.key === "ArrowDown") {
        selected = selectNext(node.children, selected);
        updateChild(selected);
      }
    } else {
      if (e.key === "ArrowLeft") {
        selected = selectPrevious(node.children, selected);
        updateChild(selected);
      }

      if (e.key === "ArrowRight") {
        selected = selectNext(node.children, selected);
        updateChild(selected);
      }
    }
  }

  /** @param {Event} e */
  function onPointerMove(e) {
    if (!e.target || !enabled || !node.querySelector('[data-open="true"]')) return;

    /** @type {Node} */
    // @ts-ignore
    const element = e.target;

    selected = getElementIndex(node, element);
    updateChild(selected);
  }

  /** @param {Event} e */
  function onFocusIn(e) {
    if (!("target" in e)) return;

    if (!enabled) {
      enabled = true;
      updateChild(selected);
    }
  }

  /** @param {Event} e */
  function onClickIn(e) {
    if (!("target" in e)) return;
    /** @type {Element} */
    // @ts-expect-error
    const element = e.target;

    const position = getElementIndex(node, element);
    selected = position;

    enabled = true;
    updateChild(selected);
  }

  /** Internal helpers */

  /** @param {number} selected */
  function updateChild(selected) {
    const items = node.children;
    const element = items[selected];

    if (element) {
      if (params && "updateChild" in params && params.updateChild) {
        params.updateChild(node, element);
      }

      const highlightedElement = node.querySelector(`[${highlighted}]`);

      if (highlightedElement) {
        highlightedElement.removeAttribute(highlighted);
      }

      element.setAttribute(highlighted, "");
      const elementItem = element.querySelector(item);

      if (elementItem) {
        // @ts-expect-error we know our menuitem will be a button
        elementItem.focus();
      }

      // if we have an open panel
      if (node.querySelector(openMenu)) {
        const matchingMenu = element.querySelector(menu);

        node.querySelectorAll(menu).forEach((item) => {
          if (item === matchingMenu) {
            item.dispatchEvent(new CustomEvent(eventName, { detail: "open" }));
          } else {
            item.dispatchEvent(new CustomEvent(eventName, { detail: "close" }));
          }
        });
      }
    }
  }

  return {
    update() {
      const defaultSelectors =
        params && "selectors" in params ? params.selectors : undefined;

      let values = getMenuBarSelectors(defaultSelectors);

      item = values.item;
      menu = values.menu;
      highlighted = values.highlighted;
      openMenu = values.openMenu;
    },
    destroy() {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      node.removeEventListener("click", onClickIn);
      node.removeEventListener("focusin", onFocusIn);
      node.removeEventListener("pointermove", onPointerMove);
    },
  };
}

export const role = "menubar";
