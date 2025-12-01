# @shinatga/editor

시냇가 프로젝트를 위한 Tiptap 기반 Wysiwyg 에디터 패키지입니다.

## 기능

- 📝 풍부한 텍스트 편집 기능 (굵게, 기울임, 밑줄, 취소선)
- 🎨 형광펜 하이라이트
- 🔗 링크 삽입
- 📋 목록 (순서 있는 목록, 순서 없는 목록)
- 📑 제목 (H1, H2, H3)
- ↶ 실행 취소/다시 실행
- 📖 성경 구절 블록 (커스텀 확장)
- 📝 템플릿 필드 (커스텀 확장)

## 설치

이 패키지는 워크스페이스 내부 패키지이므로 별도 설치가 필요 없습니다.

```json
{
  "dependencies": {
    "@shinatga/editor": "workspace:*"
  }
}
```

## 사용법

### 기본 사용

```tsx
import { TipTapEditor } from "@shinatga/editor";

export default function MyComponent() {
  const handleUpdate = (editor) => {
    const html = editor.getHTML();
    console.log(html);
  };

  return (
    <TipTapEditor
      placeholder="내용을 입력하세요..."
      onUpdate={handleUpdate}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | 초기 HTML 콘텐츠 |
| `placeholder` | `string` | `"내용을 입력하세요..."` | 플레이스홀더 텍스트 |
| `editable` | `boolean` | `true` | 편집 가능 여부 |
| `onUpdate` | `(editor: Editor) => void` | `undefined` | 콘텐츠 변경 시 호출되는 콜백 |
| `className` | `string` | `""` | 추가 CSS 클래스 |
| `showMenuBar` | `boolean` | `true` | 메뉴바 표시 여부 |

### 읽기 전용 모드

```tsx
<TipTapEditor
  content={savedContent}
  editable={false}
  showMenuBar={false}
/>
```

### 커스텀 스타일링

```tsx
<TipTapEditor
  className="my-custom-editor"
  placeholder="여기에 입력하세요..."
/>
```

## 키보드 단축키

- `Ctrl + B` - 굵게
- `Ctrl + I` - 기울임
- `Ctrl + U` - 밑줄
- `Ctrl + Z` - 실행 취소
- `Ctrl + Y` - 다시 실행
- `Ctrl + Shift + X` - 취소선

## 커스텀 확장

### BibleVerse

성경 구절을 삽입하기 위한 커스텀 노드입니다.

```tsx
editor.chain().focus().setBibleVerse("요한복음 3:16").run();
```

### TemplateField

템플릿 필드를 삽입하기 위한 커스텀 노드입니다.

```tsx
editor.chain().focus().setTemplateField("field-1", "질문 1").run();
```

## 개발

```bash
# 타입 체크
pnpm type-check

# 린트
pnpm lint
```

## 의존성

- `@tiptap/react` - Tiptap React 바인딩
- `@tiptap/starter-kit` - 기본 확장 모음
- `@tiptap/extension-highlight` - 하이라이트 확장
- `@tiptap/extension-link` - 링크 확장
- `@tiptap/extension-underline` - 밑줄 확장
- `@tiptap/extension-placeholder` - 플레이스홀더 확장

## 라이센스

Private

