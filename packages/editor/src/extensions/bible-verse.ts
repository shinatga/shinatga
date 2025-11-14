import { Node, mergeAttributes } from "@tiptap/core";

export interface BibleVerseOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    bibleVerse: {
      setBibleVerse: (reference: string) => ReturnType;
    };
  }
}

export const BibleVerse = Node.create<BibleVerseOptions>({
  name: "bibleVerse",

  group: "block",

  content: "inline*",

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      reference: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-reference"),
        renderHTML: (attributes) => {
          if (!attributes.reference) {
            return {};
          }

          return {
            "data-reference": attributes.reference,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="bible-verse"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        { "data-type": "bible-verse" }
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setBibleVerse:
        (reference: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { reference },
          });
        },
    };
  },
});
