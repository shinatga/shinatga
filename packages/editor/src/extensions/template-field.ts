import { Node, mergeAttributes } from "@tiptap/core";

export interface TemplateFieldOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    templateField: {
      setTemplateField: (fieldId: string, label: string) => ReturnType;
    };
  }
}

export const TemplateField = Node.create<TemplateFieldOptions>({
  name: "templateField",

  group: "block",

  content: "block+",

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      fieldId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-field-id"),
        renderHTML: (attributes) => {
          if (!attributes.fieldId) {
            return {};
          }

          return {
            "data-field-id": attributes.fieldId,
          };
        },
      },
      label: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-label"),
        renderHTML: (attributes) => {
          if (!attributes.label) {
            return {};
          }

          return {
            "data-label": attributes.label,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="template-field"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        this.options.HTMLAttributes,
        HTMLAttributes,
        { "data-type": "template-field" }
      ),
      0,
    ];
  },

  addCommands() {
    return {
      setTemplateField:
        (fieldId: string, label: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { fieldId, label },
          });
        },
    };
  },
});
