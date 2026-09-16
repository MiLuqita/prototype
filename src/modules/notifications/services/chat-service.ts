import type { ChatMessage } from "@/modules/notifications/types";

export function getTaskMessages(messages: ChatMessage[], taskId: string): ChatMessage[] {
  return messages.filter((message) => message.taskId === taskId).sort((a, b) => a.sentAt.localeCompare(b.sentAt));
}
