"use client";

import { Input } from "@shinatga/ui";
import { TipTapEditor, type Editor } from "@shinatga/editor";
import type { TemplateField } from "@shinatga/templates";

interface TemplateFieldRendererProps {
  field: TemplateField;
  value: any;
  onChange: (fieldId: string, value: any) => void;
  error?: string;
  onEditorUpdate?: (editor: Editor) => void;
}

export function TemplateFieldRenderer({
  field,
  value,
  onChange,
  error,
  onEditorUpdate,
}: TemplateFieldRendererProps) {
  const handleChange = (newValue: any) => {
    onChange(field.id, newValue);
  };

  const renderInput = () => {
    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full"
          />
        );

      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring min-h-[120px]"
          />
        );

      case "date":
        return (
          <Input
            type="datetime-local"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
          />
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
          >
            <option value="">선택하세요</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "scripture":
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className="w-full font-mono"
          />
        );

      case "rich-text":
        return (
          <div className="border border-border rounded-lg">
            <TipTapEditor
              placeholder={field.placeholder}
              onUpdate={(editor) => {
                handleChange(editor.getHTML());
                onEditorUpdate?.(editor);
              }}
            />
          </div>
        );

      default:
        return <div className="text-muted-foreground">지원하지 않는 필드 타입입니다.</div>;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </label>
      {field.description && (
        <p className="text-xs text-muted-foreground mb-2">{field.description}</p>
      )}
      {renderInput()}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
