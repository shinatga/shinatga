"use client";

import { Input } from "@shinatga/ui";
import { TipTapEditor, type Editor } from "@shinatga/editor";
import type { TemplateField } from "@shinatga/templates";
import { RepeatableFieldRenderer } from "./RepeatableFieldRenderer";

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
    const inputClassName = "w-full px-3.5 py-2.5 border border-border/50 bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-colors";

    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={inputClassName}
          />
        );

      case "textarea":
        return (
          <textarea
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={field.placeholder}
            className={`${inputClassName} min-h-[120px] resize-y`}
          />
        );

      case "date":
        return (
          <Input
            type="datetime-local"
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className={inputClassName}
          />
        );

      case "select":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleChange(e.target.value)}
            className={inputClassName}
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
            className={`${inputClassName} font-mono`}
          />
        );

      case "rich-text":
        return (
          <div className="bg-muted/30 rounded-lg border border-border/50">
            <TipTapEditor
              placeholder={field.placeholder}
              onUpdate={(editor) => {
                handleChange(editor.getHTML());
                onEditorUpdate?.(editor);
              }}
            />
          </div>
        );

      case "repeatable":
        return (
          <RepeatableFieldRenderer
            field={field}
            value={value || []}
            onChange={onChange}
            error={error}
          />
        );

      default:
        return <div className="text-muted-foreground text-sm">지원하지 않는 필드 타입입니다.</div>;
    }
  };

  // repeatable 타입은 자체적으로 label과 description을 렌더링
  if (field.type === "repeatable") {
    return renderInput();
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-2.5">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </label>
      {field.description && (
        <p className="text-xs text-muted-foreground mb-2.5 leading-relaxed">{field.description}</p>
      )}
      {renderInput()}
      {error && (
        <p className="text-xs text-destructive mt-2 flex items-start gap-1">
          <span className="text-destructive">⚠</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
