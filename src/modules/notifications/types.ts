import type { EntityId, ISODateString } from "@/shared/types/common";

export type NotificationType =
  | "new_application"
  | "executor_selected"
  | "payment_confirmed"
  | "task_upcoming"
  | "new_message"
  | "extension_requested"
  | "task_finished"
  | "problem_reported"
  | "rating_available";

export interface Notification {
  id: EntityId;
  userId: EntityId;
  type: NotificationType;
  title: string;
  body: string;
  taskId?: EntityId;
  createdAt: ISODateString;
  readAt?: ISODateString;
}

export interface ChatMessage {
  id: EntityId;
  taskId: EntityId;
  senderId: EntityId;
  recipientId: EntityId;
  content: string;
  sentAt: ISODateString;
  readAt?: ISODateString;
}
