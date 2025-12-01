"use client";

import { useState, useEffect } from "react";
import { TipTapEditor, type Editor } from "@shinatga/editor";
import { Button } from "@shinatga/ui";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { getTemplates } from "@/lib/api";
import type { Template } from "@shinatga/database";
import type { TemplateField } from "@shinatga/templates";
import { useDialog } from "@/hooks/useDialog";
import { TemplateFieldRenderer } from "@/components/TemplateFieldRenderer";

export default function NewNotePage() {
  const router = useRouter();
  const { showAlert, showConfirm } = useDialog();
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateFieldValues, setTemplateFieldValues] = useState<Record<string, any>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // 템플릿 목록 로드 (백그라운드)
    const loadTemplates = async () => {
      try {
        const data = await getTemplates({ isDefault: true });
        setTemplates(data);
        // 기본적으로 템플릿 없이 시작 (자유 작성)
        setSelectedTemplateId("");
      } catch (error) {
        console.error("템플릿 로드 실패:", error);
        // 템플릿 로드 실패해도 자유 작성은 가능
      }
    };

    loadTemplates();
  }, []);

  const handleEditorUpdate = (editorInstance: Editor) => {
    setEditor(editorInstance);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template || null);
    setTemplateFieldValues({});
    setFieldErrors({});
    setEditor(null);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setTemplateFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    if (fieldErrors[fieldId]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const convertTemplateDataToHTML = (): string => {
    if (!selectedTemplate) return "";

    let html = '<div class="template-note">';

    const fields = selectedTemplate.fields as TemplateField[];
    fields.forEach((field: TemplateField) => {
      const value = templateFieldValues[field.id];
      if (!value) return;

      html += `<div class="field-group">`;
      html += `<h3 class="field-label">${field.label}</h3>`;

      if (field.type === "rich-text") {
        html += `<div class="field-content">${value}</div>`;
      } else if (field.type === "repeatable") {
        // 반복 필드 처리
        const items = value as any[];
        html += `<div class="field-content repeatable-items">`;

        items.forEach((item, index) => {
          html += `<div class="repeatable-item" style="margin-bottom: 1.5rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem;">`;
          html += `<h4 style="font-weight: 600; margin-bottom: 0.75rem;">항목 ${index + 1}</h4>`;

          field.subfields?.forEach((subfield) => {
            const subfieldValue = item[subfield.id];
            if (subfieldValue) {
              html += `<div style="margin-bottom: 0.5rem;">`;
              html += `<strong>${subfield.label}:</strong> `;
              const escapedValue = subfieldValue.toString().replace(/\n/g, '<br>');
              html += `<span>${escapedValue}</span>`;
              html += `</div>`;
            }
          });

          html += `</div>`;
        });

        html += `</div>`;
      } else {
        const escapedValue = value.toString().replace(/\n/g, '<br>');
        html += `<div class="field-content"><p>${escapedValue}</p></div>`;
      }

      html += `</div>`;
    });

    html += '</div>';
    return html;
  };

  const validateTemplateFields = (): boolean => {
    if (!selectedTemplate) return true;

    const errors: Record<string, string> = {};

    const fields = selectedTemplate.fields as TemplateField[];
    fields.forEach((field: TemplateField) => {
      const value = templateFieldValues[field.id];

      if (field.type === "repeatable") {
        // 반복 필드 검증
        if (field.required && (!value || value.length === 0)) {
          errors[field.id] = `${field.label}에 최소 1개 이상의 항목을 추가해주세요.`;
        } else if (value && Array.isArray(value)) {
          // minItems 검증
          if (field.minItems && value.length < field.minItems) {
            errors[field.id] = `${field.label}에 최소 ${field.minItems}개 이상의 항목이 필요합니다.`;
          }
          // maxItems 검증
          if (field.maxItems && value.length > field.maxItems) {
            errors[field.id] = `${field.label}은(는) 최대 ${field.maxItems}개까지만 추가할 수 있습니다.`;
          }
        }
      } else {
        // 일반 필드 검증
        if (field.required && !value) {
          errors[field.id] = `${field.label}은(는) 필수 항목입니다.`;
        }
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!title.trim()) {
      await showAlert({ description: "제목을 입력해주세요." });
      return;
    }

    if (selectedTemplate && !validateTemplateFields()) {
      await showAlert({ description: "필수 항목을 모두 입력해주세요." });
      return;
    }

    setIsSaving(true);

    try {
      let htmlContent: string;

      if (selectedTemplate) {
        htmlContent = convertTemplateDataToHTML();
      } else {
        htmlContent = editor?.getHTML() || "";
      }

      const noteData: any = {
        title,
        content: htmlContent,
      };

      if (selectedTemplateId) {
        noteData.templateId = selectedTemplateId;
      }

      await createNote(noteData);

      await showAlert({ description: "노트가 저장되었습니다!" });
      router.push("/notes");
    } catch (error) {
      console.error("노트 저장 실패:", error);
      await showAlert({
        description: error instanceof Error ? error.message : "노트 저장에 실패했습니다."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = async () => {
    const confirmed = await showConfirm({
      description: "작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?"
    });
    if (confirmed) {
      router.push("/notes");
    }
  };

  // 템플릿 로딩은 백그라운드에서 진행, 사용자는 바로 작성 가능

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">새 노트 작성</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="template" className="block text-sm font-medium mb-2">
            템플릿 <span className="text-muted-foreground text-xs">(선택사항)</span>
          </label>
          <select
            id="template"
            value={selectedTemplateId}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
            disabled={isSaving}
          >
            <option value="">템플릿 없이 자유롭게 작성</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="노트 제목을 입력하세요"
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"
            disabled={isSaving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {selectedTemplate ? "템플릿 작성" : "내용"}
          </label>
          {selectedTemplate ? (
            <div className="space-y-4">
              {(selectedTemplate.fields as TemplateField[]).map((field: TemplateField) => (
                <TemplateFieldRenderer
                  key={field.id}
                  field={field}
                  value={templateFieldValues[field.id]}
                  onChange={handleFieldChange}
                  error={fieldErrors[field.id]}
                  onEditorUpdate={field.type === "rich-text" ? setEditor : undefined}
                />
              ))}
            </div>
          ) : (
            <TipTapEditor
              placeholder="노트 내용을 입력하세요..."
              onUpdate={handleEditorUpdate}
            />
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> 에디터 단축키
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>Ctrl+B</strong>: 굵게</li>
          <li><strong>Ctrl+I</strong>: 기울임</li>
          <li><strong>Ctrl+U</strong>: 밑줄</li>
          <li><strong>Ctrl+Z</strong>: 실행 취소</li>
          <li><strong>Ctrl+Y</strong>: 다시 실행</li>
        </ul>
      </div>
    </div>
  );
}

