import { Template } from "../types";

export const prayerTemplate: Template = {
  name: "목장 기도제목",
  description: "목장 모임에서 목장원들의 기도제목을 기록합니다",
  type: "prayer",
  icon: "MessageCircleMore",
  color: "#8B5CF6",
  isDefault: true,
  isPublic: true,
  fields: [
    {
      id: "prayer-date",
      label: "목장 모임 날짜",
      type: "date",
      required: true,
    },
    {
      id: "prayer-members",
      label: "목장원 기도제목",
      type: "repeatable",
      required: true,
      description: "목장원별로 기도제목을 추가하세요",
      minItems: 1,
      subfields: [
        {
          id: "member-name",
          label: "이름",
          type: "text",
          required: true,
          placeholder: "목장원 이름",
        },
        {
          id: "member-prayer",
          label: "기도제목",
          type: "textarea",
          required: true,
          placeholder: "이번 주 기도제목을 입력하세요",
        },
      ],
    },
  ],
};
