"use client";

import { useState, useEffect } from "react";
import { TipTapEditor, type Editor } from "@shinatga/editor";
import { Button } from "@shinatga/ui";
import { Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import { getTemplates } from "@/lib/api";
import type { Template } from "@shinatga/database";
import { useDialog } from "@/hooks/useDialog";

export default function NewNotePage() {
  const router = useRouter();
  const { showAlert, showConfirm } = useDialog();
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

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

  const handleSave = async () => {
    if (!title.trim()) {
      await showAlert({ description: "제목을 입력해주세요." });
      return;
    }

    setIsSaving(true);

    try {
      const htmlContent = editor?.getHTML() || "";

      const noteData: any = {
        title,
        content: htmlContent,
      };

      // 템플릿이 선택된 경우에만 포함
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
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
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
            className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isSaving}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            내용
          </label>
          <TipTapEditor
            placeholder="노트 내용을 입력하세요..."
            onUpdate={handleEditorUpdate}
          />
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

