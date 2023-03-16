const inBrowser = typeof window !== "undefined";

const overflowScrollReg = /scroll|auto/i;
const defaultRoot = inBrowser ? window : undefined;

const isElement = (node: HTMLElement) => {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === ELEMENT_NODE_TYPE;
};

// https://github.com/youzan/vant/issues/3823
const getScrollParent = (el, root) => {
  let node = el;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }

  return root;
};

const useScrollParent = (el, root = defaultRoot) => {
  const scrollParent = ref(null);

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollParent(el.value, root);
    }
  });

  return scrollParent;
};

export { useScrollParent };
