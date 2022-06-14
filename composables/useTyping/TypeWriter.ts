type QueueItem = () => Promise<void>;

/**
 * Check if a string contains a HTML tag or not
 *
 * @param {String} string String to check for HTML tag
 * @return {Boolean} True|False
 */
const doesStringContainHTMLTag = string => {
  const regexp = new RegExp(/<[a-z][\s\S]*>/i);
  return regexp.test(string);
};

/**
 * Get the DOM element from a string
 * - Create temporary div element
 * - Change innerHTML of div element to the string
 * - Return the first child of the temporary div element
 *
 * @param {String} string String to convert into a DOM node
 *
 * @author Tameem Safi <tamem@safi.me.uk>
 */
// const getDOMElementFromString = string => {
//   const div = document.createElement("div");
//   div.innerHTML = string;
//   return div.childNodes;
// };

export default class Typewriter {
  #queue: QueueItem[] = [];
  #element: HTMLElement;
  #loop: boolean;
  #typingSpeed: number;
  #deletingSpeed: number;

  constructor(parent: HTMLElement, { loop = false, typingSpeed = 50, deletingSpeed = 50 } = {}) {
    this.#element = document.createElement("div");
    parent.append(this.#element);
    this.#loop = loop;
    this.#typingSpeed = typingSpeed;
    this.#deletingSpeed = deletingSpeed;
  }

  typeString(string: string) {
    this.#addToQueue(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.append(string[i]);
        i++;
        if (i >= string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.#typingSpeed);
    });

    return this;
  }

  /**
   * Adds string characters to event queue for typing
   *
   * @param {String} string String to type
   * @param {HTMLElement} node Node to add character inside of
   * @return {Typewriter}
   *
   * @author Tameem Safi <tamem@safi.me.uk>
   */
  // typeString = (string, node = null) => {
  //   if (doesStringContainHTMLTag(string)) {
  //     return this.typeOutHTMLString(string, node);
  //   }
  //
  //   if (string) {
  //     const { stringSplitter } = this.options || {};
  //     const characters =
  //       typeof stringSplitter === "function" ? stringSplitter(string) : string.split("");
  //     this.typeCharacters(characters, node);
  //   }
  //
  //   return this;
  // };

  deleteChars(number: number) {
    this.#addToQueue(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        i++;
        if (i >= number) {
          clearInterval(interval);
          resolve();
        }
      }, this.#deletingSpeed);
    });

    return this;
  }

  deleteAll(deleteSpeed = this.#deletingSpeed) {
    this.#addToQueue(resolve => {
      const interval = setInterval(() => {
        this.#element.innerText = this.#element.innerText.substring(
          0,
          this.#element.innerText.length - 1
        );
        if (this.#element.innerText.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, deleteSpeed);
    });

    return this;
  }

  /**
   * Type out a string which is wrapper around HTML tag
   *
   * @param {String} string String to type
   * @param {HTMLElement} parentNode Node to add inner nodes to
   * @return {Typewriter}
   *
   * @author Tameem Safi <tamem@safi.me.uk>
   */
  // #typeOutHTMLString = (string, parentNode = null, pasteEffect) => {
  //   const childNodes = getDOMElementFromString(string);
  //
  //   if (childNodes.length > 0) {
  //     for (let i = 0; i < childNodes.length; i++) {
  //       const node = childNodes[i];
  //       const nodeHTML = node.innerHTML;
  //
  //       if (node && node.nodeType !== 3) {
  //         // Reset innerText of HTML element
  //         node.innerHTML = "";
  //
  //         // Add event queue item to insert HTML tag before typing characters
  //         this.addEventToQueue(EVENT_NAMES.ADD_HTML_TAG_ELEMENT, {
  //           node,
  //           parentNode,
  //         });
  //
  //         pasteEffect ? this.pasteString(nodeHTML, node) : this.typeString(nodeHTML, node);
  //       } else {
  //         if (node.textContent) {
  //           pasteEffect
  //             ? this.pasteString(node.textContent, parentNode)
  //             : this.typeString(node.textContent, parentNode);
  //         }
  //       }
  //     }
  //   }
  //
  //   return this;
  // };

  pauseFor(duration: number) {
    this.#addToQueue(resolve => {
      setTimeout(resolve, duration);
    });

    return this;
  }

  async start() {
    let cb = this.#queue.shift();
    while (cb != null) {
      await cb();
      if (this.#loop) this.#queue.push(cb);
      cb = this.#queue.shift();
    }

    return this;
  }

  #addToQueue(cb: (resolve: () => void) => void) {
    this.#queue.push(() => new Promise(cb));
  }
}
