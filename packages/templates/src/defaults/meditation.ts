import { Template } from "../types";

export const meditationTemplate: Template = {
  name: "묵상 노트",
  description: "성경 묵상이나 QT 내용을 기록합니다",
  type: "meditation",
  icon: "BookA",
  color: "#10B981",
  isDefault: true,
  isPublic: true,
  fields: [
    {
      id: "meditation-date",
      label: "날짜",
      type: "date",
      required: true,
    },
    {
      id: "meditation-scripture",
      label: "본문 말씀",
      type: "scripture",
      required: true,
      placeholder: "예) 시편 23:1-6",
    },
    {
      id: "meditation-observation",
      label: "관찰 (Observation)",
      type: "textarea",
      required: true,
      placeholder: "본문에서 발견한 것들을 기록하세요 (누가, 무엇을, 언제, 어디서, 왜, 어떻게)",
    },
    {
      id: "meditation-interpretation",
      label: "해석 (Interpretation)",
      type: "textarea",
      required: true,
      placeholder: "본문이 의미하는 바는 무엇인가요?",
    },
    {
      id: "meditation-application",
      label: "적용 (Application)",
      type: "textarea",
      required: true,
      placeholder: "오늘 내 삶에 어떻게 적용할까요? (구체적이고 실천 가능한 적용점)",
    },
    {
      id: "meditation-prayer",
      label: "기도",
      type: "rich-text",
      required: true,
      placeholder: "말씀을 통해 드리는 기도",
    },
  ],
};
