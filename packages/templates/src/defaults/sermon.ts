import { Template } from "../types";

export const sermonTemplate: Template = {
  name: "예배 노트",
  description: "예배 중 들은 설교 내용을 기록합니다",
  type: "sermon",
  icon: "BookOpen",
  color: "#3B82F6",
  isDefault: true,
  isPublic: true,
  fields: [
    {
      id: "sermon-date",
      label: "예배 날짜",
      type: "date",
      required: true,
    },
    {
      id: "sermon-type",
      label: "예배 종류",
      type: "select",
      required: true,
      options: ["주일 오전 예배", "주일 오후 예배", "수요 예배", "새벽 기도회", "금요 기도회", "기타"],
    },
    {
      id: "sermon-title",
      label: "설교 제목",
      type: "text",
      required: true,
      placeholder: "설교 제목을 입력하세요",
    },
    {
      id: "sermon-scripture",
      label: "본문 말씀",
      type: "scripture",
      required: true,
      placeholder: "예) 요한복음 3:16",
    },
    {
      id: "sermon-speaker",
      label: "설교자",
      type: "text",
      required: false,
      placeholder: "설교자 이름",
    },
    {
      id: "sermon-notes",
      label: "노트",
      type: "rich-text",
      required: false,
      placeholder: "설교 내용, 적용점, 생각 등을 자유롭게 기록하세요",
    },
  ],
};
