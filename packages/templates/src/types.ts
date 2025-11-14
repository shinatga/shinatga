import { z } from "zod";

// Template Field Types
export const TemplateFieldTypeSchema = z.enum([
  "text",
  "textarea",
  "rich-text",
  "scripture",
  "date",
  "select",
  "multiselect",
  "tags",
]);

export type TemplateFieldType = z.infer<typeof TemplateFieldTypeSchema>;

// Template Field Schema
export const TemplateFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: TemplateFieldTypeSchema,
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  defaultValue: z.any().optional(),
  options: z.array(z.string()).optional(), // For select/multiselect
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

export type TemplateField = z.infer<typeof TemplateFieldSchema>;

// Template Type Schema
export const TemplateTypeSchema = z.enum([
  "sermon",
  "meditation",
  "prayer",
  "custom",
]);

export type TemplateType = z.infer<typeof TemplateTypeSchema>;

// Template Schema
export const TemplateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "이름은 필수입니다"),
  description: z.string().optional(),
  type: TemplateTypeSchema,
  icon: z.string().optional(),
  color: z.string().optional(),
  fields: z.array(TemplateFieldSchema),
  isDefault: z.boolean().default(false),
  isPublic: z.boolean().default(false),
  userId: z.string().optional(),
});

export type Template = z.infer<typeof TemplateSchema>;

// Note Content Schema (TipTap JSON format)
export const NoteContentSchema = z.object({
  type: z.string(),
  content: z.array(z.any()).optional(),
  attrs: z.record(z.any()).optional(),
  marks: z.array(z.any()).optional(),
  text: z.string().optional(),
});

export type NoteContent = z.infer<typeof NoteContentSchema>;

// Note Schema
export const NoteSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "제목은 필수입니다"),
  content: NoteContentSchema,
  templateId: z.string(),
  userId: z.string(),
  tags: z.array(z.string()).default([]),
  category: z.string().optional(),
  isFavorite: z.boolean().default(false),
  isPinned: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export type Note = z.infer<typeof NoteSchema>;
