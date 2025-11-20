"use client";

import { type Editor } from "@tiptap/react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Highlighter, 
  Link, 
  Unlink, 
  RemoveFormatting, 
  Undo, 
  Redo,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }

  const buttonClass = "p-2 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-8 w-8";
  const activeClass = "bg-accent hover:bg-accent/80";
  const iconClass = "w-4 h-4";

  return (
    <div className="border-b border-border p-2 flex flex-wrap gap-1 bg-card sticky top-0 z-10">
      {/* Text Formatting */}
      <div className="flex gap-1 border-r border-border pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${buttonClass} ${editor.isActive("bold") ? activeClass : ""}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${editor.isActive("italic") ? activeClass : ""}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={`${buttonClass} ${editor.isActive("underline") ? activeClass : ""}`}
          title="Underline (Ctrl+U)"
        >
          <Underline className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${editor.isActive("strike") ? activeClass : ""}`}
          title="Strikethrough"
        >
          <Strikethrough className={iconClass} />
        </button>
      </div>

      {/* Headings */}
      <div className="flex gap-1 border-r border-border pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 1 }) ? activeClass : ""}`}
          title="Heading 1"
        >
          <Heading1 className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 2 }) ? activeClass : ""}`}
          title="Heading 2"
        >
          <Heading2 className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${buttonClass} ${editor.isActive("heading", { level: 3 }) ? activeClass : ""}`}
          title="Heading 3"
        >
          <Heading3 className={iconClass} />
        </button>
      </div>

      {/* Lists */}
      <div className="flex gap-1 border-r border-border pr-2">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${editor.isActive("bulletList") ? activeClass : ""}`}
          title="Bullet List"
        >
          <List className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${editor.isActive("orderedList") ? activeClass : ""}`}
          title="Ordered List"
        >
          <ListOrdered className={iconClass} />
        </button>
      </div>

      {/* Highlight */}
      <div className="flex gap-1 border-r border-border pr-2">
        <button
          onClick={() => editor.chain().focus().toggleHighlight({ color: "#fef081" }).run()}
          className={`${buttonClass} ${editor.isActive("highlight", { color: "#fef081" }) ? activeClass : ""}`}
          title="Highlight"
        >
          <Highlighter className={iconClass} />
        </button>
      </div>

      {/* Links */}
      <div className="flex gap-1 border-r border-border pr-2">
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
          <Link className={iconClass} />
        </button>
        {editor.isActive("link") && (
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={buttonClass}
            title="Remove Link"
          >
            <Unlink className={iconClass} />
          </button>
        )}
      </div>

      {/* Clear Formatting */}
      <div className="flex gap-1 border-r border-border pr-2">
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className={buttonClass}
          title="Clear Formatting"
        >
          <RemoveFormatting className={iconClass} />
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
          <Undo className={iconClass} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={buttonClass}
          title="Redo (Ctrl+Y)"
        >
          <Redo className={iconClass} />
        </button>
      </div>
    </div>
  );
}
