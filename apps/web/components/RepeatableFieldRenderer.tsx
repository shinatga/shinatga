"use client";

import { Button, Input } from "@shinatga/ui";
import { Plus, X } from "lucide-react";
import type { TemplateField, Subfield } from "@shinatga/templates";

interface RepeatableFieldRendererProps {
  field: TemplateField;
  value: any[];
  onChange: (fieldId: string, value: any[]) => void;
  error?: string;
}

export function RepeatableFieldRenderer({
  field,
  value = [],
  onChange,
  error,
}: RepeatableFieldRendererProps) {
  const subfields = field.subfields || [];

  const addItem = () => {
    const newItem: Record<string, any> = {};
    subfields.forEach((subfield) => {
      newItem[subfield.id] = "";
    });
    onChange(field.id, [...value, newItem]);
  };

  const removeItem = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(field.id, newValue);
  };

  const updateItem = (index: number, subfieldId: string, subfieldValue: any) => {
    const newValue = [...value];
    newValue[index] = {
      ...newValue[index],
      [subfieldId]: subfieldValue,
    };
    onChange(field.id, newValue);
  };

  const renderSubfield = (
    subfield: Subfield,
    itemIndex: number,
    subfieldValue: any
  ) => {
    const handleChange = (newValue: any) => {
      updateItem(itemIndex, subfield.id, newValue);
    };

    switch (subfield.type) {
      case "text":
        return (
          <Input
            type="text"
            value={subfieldValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={subfield.placeholder}
            className="w-full"
          />
        );

      case "textarea":
        return (
          <textarea
            value={subfieldValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={subfield.placeholder}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring min-h-[100px]"
          />
        );

      case "date":
        return (
          <Input
            type="datetime-local"
            value={subfieldValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full"
          />
        );

      case "select":
        return (
          <select
            value={subfieldValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
          >
            <option value="">선택하세요</option>
            {subfield.options?.map((option: string) => (
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
            value={subfieldValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={subfield.placeholder}
            className="w-full font-mono"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          추가
        </Button>
      </div>

      {field.description && (
        <p className="text-xs text-muted-foreground mb-3">{field.description}</p>
      )}

      <div className="space-y-4">
        {value.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8 border border-dashed border-border rounded-lg">
            항목을 추가해주세요
          </p>
        )}

        {value.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="border border-border rounded-lg p-4 relative"
          >
            <button
              type="button"
              onClick={() => removeItem(itemIndex)}
              className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="삭제"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3 pr-8">
              {subfields.map((subfield) => (
                <div key={subfield.id}>
                  <label className="block text-sm font-medium mb-1">
                    {subfield.label}
                    {subfield.required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </label>
                  {renderSubfield(subfield, itemIndex, item[subfield.id])}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
