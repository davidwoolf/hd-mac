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
 * @typedef MenuBarArgs
 * @property {"horizontal" | "vertical"} [direction]
 * @property {Record<string, string>} [selectors]
 * @property {(firstItem: Element, rest: Element[]) => void} [setup]
 * @property {(node: Element, element: Element) => void} [updateChild]
 */

/**
 *
 * @param {Element} node
 * @param {MenuBarArgs} [params]
 */
export function menubar(node, params) {
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
        selectPreviousChild();
      }

      if (e.key === "ArrowDown") {
        selectNextChild();
      }
    } else {
      if (e.key === "ArrowLeft") {
        selectPreviousChild();
      }

      if (e.key === "ArrowRight") {
        selectNextChild();
      }
    }
  }

  /** @param {Event} e */
  function onPointerMove(e) {
    if (!e.target || !enabled || !node.querySelector('[data-open="true"]')) return;

    /** @type {Node} */
    // @ts-ignore
    const element = e.target;

    const topLevelElement = getTopLevelChild(element);
    const position = getPosition(topLevelElement);

    selected = position;
    updateChild(selected);
  }

  /** @param {Event} e */
  function onFocusIn(e) {
    if (!("target" in e)) return;
    /** @type {Element} */
    // @ts-expect-error
    const element = e.target;

    // const topLevelElement = getTopLevelChild(element);
    // const position = getPosition(topLevelElement);
    // selected = position;

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

    const topLevelElement = getTopLevelChild(element);
    const position = getPosition(topLevelElement);
    selected = position;

    enabled = true;
    updateChild(selected);
  }

  /** Internal helpers */

  /**
   *
   * @param {Node} element
   * @returns {Node}
   */
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

  function selectPreviousChild() {
    const items = node.children;

    selected = selected > 0 ? selected - 1 : items.length - 1;

    updateChild(selected);
  }

  function selectNextChild() {
    const items = node.children;
    selected = selected < items.length - 1 ? selected + 1 : 0;

    updateChild(selected);
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
