import { TaskStatus, type PublicLocationView, type RevealedLocationView, type Task, type TaskDraft } from "@/modules/tasks/types";
import { PaymentStatus, type Payment } from "@/modules/payments/types";
import type { EntityId } from "@/shared/types/common";

const allowedTransitions: Record<TaskStatus, TaskStatus[]> = {
  [TaskStatus.Draft]: [TaskStatus.Published, TaskStatus.Cancelled],
  [TaskStatus.Published]: [TaskStatus.WithApplicants, TaskStatus.Cancelled],
  [TaskStatus.WithApplicants]: [TaskStatus.ExecutorSelected, TaskStatus.Cancelled],
  [TaskStatus.ExecutorSelected]: [TaskStatus.PaymentPending],
  [TaskStatus.PaymentPending]: [TaskStatus.Confirmed],
  [TaskStatus.Confirmed]: [TaskStatus.Upcoming, TaskStatus.InProgress],
  [TaskStatus.Upcoming]: [TaskStatus.InProgress],
  [TaskStatus.InProgress]: [TaskStatus.CompletionPending, TaskStatus.Disputed],
  [TaskStatus.CompletionPending]: [TaskStatus.Completed, TaskStatus.Disputed],
  [TaskStatus.Disputed]: [],
  [TaskStatus.Completed]: [],
  [TaskStatus.Cancelled]: [],
};

export function canTransitionTask(from: TaskStatus, to: TaskStatus): boolean {
  return allowedTransitions[from].includes(to);
}

export function transitionTask(task: Task, to: TaskStatus, now: string): Task {
  if (!canTransitionTask(task.status, to)) {
    throw new Error(`Transición no permitida: ${task.status} → ${to}`);
  }
  return { ...task, status: to, updatedAt: now, ...(to === TaskStatus.Cancelled ? { cancelledAt: now } : {}) };
}

export function draftToTask(draft: TaskDraft, requesterId: EntityId, id: EntityId, now: string): Task {
  const scheduledStartAt = `${draft.scheduledDate}T${draft.scheduledTime || "09:00"}:00-05:00`;
  return {
    id,
    requesterId,
    title: draft.title.trim(),
    description: draft.description.trim(),
    categoryId: draft.categoryId,
    price: Number(draft.price),
    scheduledStartAt,
    estimatedDurationMinutes: Number(draft.estimatedDurationMinutes),
    location: {
      public: { district: draft.district, zoneLabel: draft.district, approximatePoint: { lat: -12.115, lng: -76.995 } },
      private: { exactAddress: draft.exactAddress, reference: draft.reference, exactPoint: { lat: -12.115, lng: -76.995 } },
    },
    photoUrls: [],
    conditions: draft.conditions.trim() ? [draft.conditions.trim()] : ["Coordinar cambios de alcance dentro de Mi Luquita."],
    status: TaskStatus.Published,
    createdAt: now,
    updatedAt: now,
  };
}

function approximateDistance(taskId: string): number {
  const seed = taskId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return Math.round((0.8 + (seed % 58) / 10) * 10) / 10;
}

export function getPublicLocation(task: Task): PublicLocationView {
  return {
    district: task.location.public.district,
    zoneLabel: task.location.public.zoneLabel,
    approximateDistanceKm: approximateDistance(task.id),
  };
}

export function isPaymentSecured(taskId: string, payments: Payment[]): boolean {
  return payments.some((payment) => payment.taskId === taskId && [PaymentStatus.Secured, PaymentStatus.Captured].includes(payment.status));
}

export function canRevealExactLocation(task: Task, userId: EntityId, payments: Payment[]): boolean {
  if (task.requesterId === userId) return true;
  return task.selectedExecutorId === userId && isPaymentSecured(task.id, payments);
}

export function getLocationForUser(task: Task, userId: EntityId, payments: Payment[]): PublicLocationView | RevealedLocationView {
  const publicLocation = getPublicLocation(task);
  if (!canRevealExactLocation(task, userId, payments)) return publicLocation;
  return {
    ...publicLocation,
    exactAddress: task.location.private.exactAddress,
    reference: task.location.private.reference,
    exactPoint: task.location.private.exactPoint,
  };
}

export function canAccessChat(task: Task, userId: EntityId, payments: Payment[]): boolean {
  const isCounterparty = task.requesterId === userId || task.selectedExecutorId === userId;
  return Boolean(isCounterparty && task.selectedExecutorId && isPaymentSecured(task.id, payments));
}

export function isEditableBeforeContract(task: Task): boolean {
  return [TaskStatus.Draft, TaskStatus.Published, TaskStatus.WithApplicants].includes(task.status) && !task.selectedExecutorId;
}
