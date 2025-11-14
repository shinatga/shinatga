import {
  TemplateSchema,
  NoteSchema,
  TemplateFieldSchema,
  type Template,
  type Note,
  type TemplateField,
} from "./types";

export class TemplateValidator {
  static validateTemplate(template: unknown): Template {
    return TemplateSchema.parse(template);
  }

  static validateNote(note: unknown): Note {
    return NoteSchema.parse(note);
  }

  static validateField(field: unknown): TemplateField {
    return TemplateFieldSchema.parse(field);
  }

  static isValidTemplate(template: unknown): template is Template {
    return TemplateSchema.safeParse(template).success;
  }

  static isValidNote(note: unknown): note is Note {
    return NoteSchema.safeParse(note).success;
  }

  static getValidationErrors(data: unknown, type: "template" | "note") {
    const schema = type === "template" ? TemplateSchema : NoteSchema;
    const result = schema.safeParse(data);

    if (result.success) {
      return [];
    }

    return result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
  }
}
