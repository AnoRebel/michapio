import TypeWriter from "./TypeWriter";

const useTyping = (element: HTMLElement, options: Object) => {
  const typer = new TypeWriter(element, options);
  return typer;
};

export { useTyping };
