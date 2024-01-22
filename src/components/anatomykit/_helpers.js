/**
 *
 * @param {Node} node
 * @param {Node} element
 * @returns {Node}
 */
export function getDirectChild(node, element) {
  if (!element.parentNode) {
    return element;
  }

  if (element.parentNode === node) {
    return element;
  }

  return getDirectChild(node, element.parentNode);
}

/**
 * @param {Element} node
 * @param {Node} element
 * */
export function getElementIndex(node, element) {
  const topLevelElement = getDirectChild(node, element);

  return Array.from(node.children).findIndex((item) => {
    return item === topLevelElement;
  });
}

/**
 *
 * @param {HTMLCollection | NodeListOf<Element>} items
 * @param {number} current
 */
export function selectPrevious(items, current) {
  return current > 0 ? current - 1 : items.length - 1;
}

/**
 *
 * @param {Element} node
 * @param {Element | null} current
 */
export function findPreviousChild(node, current) {
  if (current === null) return node.children[0];

  const index = Array.from(node.children).findIndex((item) => item === current) - 1;

  if (index < 0) {
    return node.children[node.children.length - 1];
  }

  return node.children[index];
}

/**
 *
 * @param {Element} node
 * @param {Element | null} current
 */
export function findNextChild(node, current) {
  if (current === null) return node.children[0];

  const index = Array.from(node.children).findIndex((item) => item === current) + 1;

  if (index > node.children.length - 1) {
    return node.children[0];
  }

  return node.children[index];
}

/**
 *
 * @param {HTMLCollection | NodeListOf<Element>} items
 * @param {number} current
 */
export function selectNext(items, current) {
  return current < items.length - 1 ? current + 1 : 0;
}

/**
 *
 * @param {Element | Window & typeof globalThis | null} element
 * @param {string} action
 * @param {any} listener
 */
export function addListener(element, action, listener) {
  if (!element) return () => undefined;

  element.addEventListener(action, listener);
  return () => element.removeEventListener(action, listener);
}

/**
 *
 * @param {Element | null} element
 * @param {Record<string, string | boolean | number>} attributes
 */
export function setAttributes(element, attributes) {
  if (!element) return;

  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === "boolean" && value === false) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, String(value));
    }
  });
}

/**
 *
 * @param {HTMLElement | null} element
 * @param {Record<string, string | number>} styles
 */
export function setStyles(element, styles) {
  if (!element) return;

  Object.entries(styles).forEach(([key, value]) => {
    if (
      typeof key === "string" &&
      (typeof value === "string" || typeof value === "number")
    ) {
      element.style.setProperty(key, String(value));
    } else {
      console.warn("attempting to apply an invalid style value", element, key, value);
    }
  });
}

/**
 *
 * @param {string | null | undefined} id
 */
export function getElementById(id) {
  if (typeof id !== "string") {
    return null;
  }

  return document.getElementById(id);
}

/**
 *
 * @param {Element | HTMLElement} root
 * @param {string} query
 * @param {string} [errorMessage]
 */
export function getElementByQuery(root, query, errorMessage) {
  const element = root.querySelector(query);

  if (!element || !(element instanceof HTMLElement)) {
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      throw new Error(`an required element matching ${query} is missing`);
    }
  }

  return element;
}

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function clamp(value, min, max) {
  if (value <= min) {
    return min;
  } else if (value >= max) {
    return max;
  } else {
    return value;
  }
}
