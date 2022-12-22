import { encodeQueryItem, joinURL, withBase } from "ufo";
import { createOperationsGenerator } from "#image";

const dicebearCDN = "https://avatars.dicebear.com/api/adventurer-neutral/";

const operationsGenerator = createOperationsGenerator({
  valueMap: {
    size: "undefined",
    backgroundColor: "undefined",
  },
  joinWith: "&",
  // formatter: (key, value) => `${key}=${value}`,
  formatter: (key, value) => encodeQueryItem(key, value),
});

const defaultModifiers = {
  b: "variant04",
  eyes: "variant04",
  eyebrows: "variant10",
  mouth: "variant01",
};

export function getImage(src, { modifiers = {}, baseURL = dicebearCDN } = {}) {
  // const { width, height, format, fit, ...providerModifiers } = modifiers;
  const mergeModifiers = { ...defaultModifiers, ...modifiers };
  const operations = operationsGenerator(mergeModifiers as any);

  return {
    url: withBase(joinURL(src + (operations ? "?" + operations : "")), baseURL),
  };
}
