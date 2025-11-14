"use client";

import { useState } from "react";
import { TipTapEditor, type Editor } from "@shinatga/editor";
import { Button } from "@shinatga/ui";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditorUpdate = (editor: Editor) => {
    setContent(editor.getHTML());
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    setIsSaving(true);
    // TODO: 실제 저장 로직 구현
    console.log("Saving note:", { title, content });
    
    // 임시: 2초 후 목록으로 이동
    setTimeout(() => {
      setIsSaving(false);
      router.push("/notes");
    }, 2000);
  };

  const handleCancel = () => {
    if (confirm("작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?")) {
      router.push("/notes");
    }
  };

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
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="노트 제목을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            내용
          </label>
          <TipTapEditor
            placeholder="노트 내용을 입력하세요..."
            onUpdate={handleEditorUpdate}
            className="min-h-[500px]"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">💡 에디터 단축키</h3>
        <ul className="text-sm text-gray-600 space-y-1">
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

