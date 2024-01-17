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
 * @param {Element} node
 * @param {number} current
 */
export function selectPrevious(node, current) {
  const items = node.children;

  return current > 0 ? current - 1 : items.length - 1;
}

/**
 *
 * @param {Element} node
 * @param {number} current
 */
export function selectNext(node, current) {
  const items = node.children;
  return current < items.length - 1 ? current + 1 : 0;
}

/**
 *
 * @param {Element | Window & typeof globalThis} element
 * @param {string} action
 * @param {any} listener
 */
export function addListener(element, action, listener) {
  element.addEventListener(action, listener);

  return () => element.removeEventListener(action, listener);
}
