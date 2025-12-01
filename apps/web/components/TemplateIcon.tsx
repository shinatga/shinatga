import { BookOpen, BookA, MessageCircleMore, FileText, LucideIcon } from "lucide-react";
import { cn } from "@shinatga/ui";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  BookA,
  MessageCircleMore,
  FileText,
};

interface TemplateIconProps {
  iconName?: string | null;
  className?: string;
}

export function TemplateIcon({ iconName, className }: TemplateIconProps) {
  if (!iconName) return <FileText className={cn("w-6 h-6", className)} />;

  // Lucide 아이콘 이름인 경우
  const Icon = iconMap[iconName];
  if (Icon) {
    return <Icon className={cn("w-6 h-6", className)} />;
  }

  // 이모지이거나 매핑되지 않은 경우 텍스트로 렌더링 (레거시 지원)
  // 이모지는 폰트 크기로 조절해야 하므로 별도 처리 없이 렌더링하되, 
  // className이 tailwind class라면 w/h 대신 text size가 필요할 수 있음.
  // 여기서는 일단 그대로 렌더링.
  return <span className={cn("text-xl", className)}>{iconName}</span>;
}

