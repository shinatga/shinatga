"use client";

import { type Editor } from "@tiptap/react";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const buttonClass = "p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
  const activeClass = "bg-gray-200 hover:bg-gray-300";

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-white sticky top-0 z-10">
      {/* Text Formatting */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${buttonClass} ${editor.isActive("bold") ? activeClass : ""}`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${editor.isActive("italic") ? activeClass : ""}`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`${buttonClass} ${editor.isActive("underline") ? activeClass : ""}`}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${editor.isActive("strike") ? activeClass : ""}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      {/* Headings */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 1 }) ? activeClass : ""}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 2 }) ? activeClass : ""}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 3 }) ? activeClass : ""}`}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${editor.isActive("bulletList") ? activeClass : ""}`}
          title="Bullet List"
        >
          • 목록
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${editor.isActive("orderedList") ? activeClass : ""}`}
          title="Ordered List"
        >
          1. 목록
        </button>
      </div>

      {/* Highlight */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef08a" }).run()}
          className={`${buttonClass} ${editor.isActive("highlight", { color: "#fef08a" }) ? activeClass : ""}`}
          title="Highlight"
        >
          <span className="bg-yellow-200 px-1">형광펜</span>
        </button>
      </div>

      {/* Links */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => {
            const url = window.prompt("URL을 입력하세요:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`${buttonClass} ${editor.isActive("link") ? activeClass : ""}`}
          title="Add Link"
        >
          🔗 링크
        </button>
        {editor.isActive("link") && (
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={buttonClass}
            title="Remove Link"
          >
            🔗✕
          </button>
        )}
      </div>

      {/* Clear Formatting */}
      <div className="flex gap-1 border-r border-gray-200 pr-2">
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className={buttonClass}
          title="Clear Formatting"
        >
          지우기
        </button>
      </div>

      {/* Undo/Redo */}
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={buttonClass}
          title="Undo (Ctrl+Z)"
        >
          ↶ 실행취소
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={buttonClass}
          title="Redo (Ctrl+Y)"
        >
          ↷ 다시실행
        </button>
      </div>
    </div>
  );
}

