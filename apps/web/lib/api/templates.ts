import type { Template } from "@shinatga/database";

export interface CreateTemplateData {
  name: string;
  description?: string;
  type: string;
  fields: any;
  icon?: string;
  color?: string;
}

export interface UpdateTemplateData {
  name?: string;
  description?: string;
  fields?: any;
  icon?: string;
  color?: string;
}

// 템플릿 목록 조회
export async function getTemplates(params?: {
  type?: string;
  isDefault?: boolean;
}): Promise<Template[]> {
  const searchParams = new URLSearchParams();
  
  if (params?.type) searchParams.set("type", params.type);
  if (params?.isDefault !== undefined) searchParams.set("isDefault", String(params.isDefault));

  const response = await fetch(`/api/templates?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("템플릿 목록을 불러오는데 실패했습니다.");
  }

  return response.json();
}

// 특정 템플릿 조회
export async function getTemplate(id: string): Promise<Template> {
  const response = await fetch(`/api/templates/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("템플릿을 찾을 수 없습니다.");
    }
    throw new Error("템플릿을 불러오는데 실패했습니다.");
  }

  return response.json();
}

// 커스텀 템플릿 생성
export async function createTemplate(data: CreateTemplateData): Promise<Template> {
  const response = await fetch("/api/templates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "템플릿을 생성하는데 실패했습니다.");
  }

  return response.json();
}

// 템플릿 수정
export async function updateTemplate(id: string, data: UpdateTemplateData): Promise<Template> {
  const response = await fetch(`/api/templates/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "템플릿을 수정하는데 실패했습니다.");
  }

  return response.json();
}

// 템플릿 삭제
export async function deleteTemplate(id: string): Promise<void> {
  const response = await fetch(`/api/templates/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "템플릿을 삭제하는데 실패했습니다.");
  }
}

