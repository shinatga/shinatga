import { Template } from "../types";

export const sermonTemplate: Template = {
  name: "예배 말씀",
  description: "주일 예배나 모임에서 들은 설교 내용을 기록합니다",
  type: "sermon",
  icon: "📖",
  color: "#3B82F6",
  isDefault: true,
  isPublic: true,
  fields: [
    {
      id: "sermon-title",
      label: "설교 제목",
      type: "text",
      required: true,
      placeholder: "설교 제목을 입력하세요",
    },
    {
      id: "sermon-date",
      label: "예배 날짜",
      type: "date",
      required: true,
    },
    {
      id: "sermon-speaker",
      label: "설교자",
      type: "text",
      placeholder: "설교자 이름",
    },
    {
      id: "sermon-scripture",
      label: "본문 말씀",
      type: "scripture",
      required: true,
      placeholder: "예) 요한복음 3:16",
      description: "설교의 본문이 되는 성경 구절",
    },
    {
      id: "sermon-key-verse",
      label: "핵심 구절",
      type: "scripture",
      placeholder: "가장 인상 깊었던 구절",
    },
    {
      id: "sermon-summary",
      label: "설교 요약",
      type: "rich-text",
      required: true,
      placeholder: "설교의 핵심 내용을 요약해보세요",
      description: "3가지 포인트로 정리하면 좋습니다",
    },
    {
      id: "sermon-application",
      label: "적용점",
      type: "rich-text",
      required: true,
      placeholder: "이번 주 삶에 어떻게 적용할 것인가요?",
      description: "구체적인 행동 계획을 세워보세요",
    },
    {
      id: "sermon-prayer",
      label: "기도 제목",
      type: "textarea",
      placeholder: "말씀과 관련된 기도 제목",
    },
    {
      id: "sermon-notes",
      label: "추가 메모",
      type: "rich-text",
      placeholder: "기타 생각이나 질문 사항",
    },
  ],
};
