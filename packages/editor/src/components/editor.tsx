"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import { BibleVerse } from "../extensions/bible-verse";
import { TemplateField } from "../extensions/template-field";
import { MenuBar } from "./menu-bar";
import "../styles/editor.css";

export interface TipTapEditorProps {
  content?: string;
  placeholder?: string;
  editable?: boolean;
  onUpdate?: (editor: Editor) => void;
  className?: string;
  showMenuBar?: boolean;
}

export function TipTapEditor({
  content,
  placeholder = "내용을 입력하세요...",
  editable = true,
  onUpdate,
  className = "",
  showMenuBar = true,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Underline,
      BibleVerse,
      TemplateField,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {showMenuBar && editable && <MenuBar editor={editor} />}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export { useEditor, type Editor };
