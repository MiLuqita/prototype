"use client";

import { create } from "zustand";
import { createMockDatabase } from "@/services/mock-database";
import type { User } from "@/modules/users/types";
import type { Task, TaskCategory, TaskDraft } from "@/modules/tasks/types";
import { TaskStatus } from "@/modules/tasks/types";
import type { Application } from "@/modules/applications/types";
import { ApplicationStatus } from "@/modules/applications/types";
import type { Agreement, AgreementExtension, Dispute, DisputeReason } from "@/modules/agreements/types";
import { ExtensionStatus } from "@/modules/agreements/types";
import type { MockPaymentMethod, Payment } from "@/modules/payments/types";
import { PaymentStatus, PaymentType } from "@/modules/payments/types";
import type { ChatMessage, Notification } from "@/modules/notifications/types";
import type { Rating, StarRating } from "@/modules/reputation/types";
import { RatingVisibility } from "@/modules/reputation/types";
import type { ProfileMode } from "@/shared/types/common";
import { calculatePaymentBreakdown } from "@/modules/payments/services/payment-service";
import { draftToTask, transitionTask } from "@/modules/tasks/services/task-service";

const INITIAL_NOW = "2026-09-09T20:51:00-05:00";

export const emptyDraft: TaskDraft = {
  title: "",
  description: "",
  categoryId: "cat-furniture",
  price: 60,
  scheduledDate: "2026-09-10",
  scheduledTime: "10:00",
  estimatedDurationMinutes: 120,
  useCurrentLocation: true,
  district: "Santiago de Surco",
  exactAddress: "Av. Caminos del Inca 1234",
  reference: "Portería principal",
  conditions: "",
};

interface AppState {
  currentUserId: string;
  activeProfile: ProfileMode;
  simulatedNow: string;
  nextPaymentShouldFail: boolean;
  ratingDelayPassed: boolean;
  users: User[];
  categories: TaskCategory[];
  tasks: Task[];
  applications: Application[];
  agreements: Agreement[];
  payments: Payment[];
  messages: ChatMessage[];
  notifications: Notification[];
  ratings: Rating[];
  disputes: Dispute[];
  taskDraft: TaskDraft;
  setActiveProfile: (profile: ProfileMode) => void;
  updateExecutorProfile: (bio: string, categoryIds: string[]) => void;
  setTaskDraft: (patch: Partial<TaskDraft>) => void;
  resetTaskDraft: () => void;
  publishDraft: () => string;
  editTask: (taskId: string, patch: Partial<Pick<Task, "title" | "description" | "price" | "scheduledStartAt" | "estimatedDurationMinutes">>) => void;
  cancelTask: (taskId: string) => void;
  applyToTask: (taskId: string, message?: string) => void;
  selectExecutor: (taskId: string, executorId: string) => void;
  acceptAgreementAsExecutor: (agreementId: string) => void;
  securePayment: (taskId: string, method: MockPaymentMethod) => void;
  sendMessage: (taskId: string, content: string) => void;
  startTask: (taskId: string) => void;
  proposeExtension: (taskId: string, minutes: number, scope: string, amount: number) => void;
  respondExtension: (taskId: string, extensionId: string, accept: boolean) => void;
  secureExtensionPayment: (taskId: string, extensionId: string) => void;
  finishTask: (taskId: string) => void;
  confirmCompletion: (taskId: string) => void;
  autoComplete: (taskId: string) => void;
  reportProblem: (taskId: string, reason: DisputeReason, description: string) => void;
  submitRating: (taskId: string, stars: StarRating, comment: string) => void;
  markNotificationRead: (notificationId: string) => void;
  setSimulatedNow: (value: string) => void;
  forceNextPaymentFailure: (value: boolean) => void;
  simulateRatingDelay: (value: boolean) => void;
  forceTaskStatus: (taskId: string, status: TaskStatus) => void;
  resetDemo: () => void;
}

const seed = createMockDatabase();
const clone = <T,>(value: T): T => structuredClone(value);
const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const useAppStore = create<AppState>((set, get) => ({
  currentUserId: "u-demo",
  activeProfile: "requester",
  simulatedNow: INITIAL_NOW,
  nextPaymentShouldFail: false,
  ratingDelayPassed: false,
  users: clone(seed.users),
  categories: clone(seed.categories),
  tasks: clone(seed.tasks),
  applications: clone(seed.applications),
  agreements: clone(seed.agreements),
  payments: clone(seed.payments),
  messages: clone(seed.messages),
  notifications: clone(seed.notifications),
  ratings: clone(seed.ratings),
  disputes: clone(seed.disputes),
  taskDraft: clone(emptyDraft),

  setActiveProfile: (profile) => set({ activeProfile: profile }),

  updateExecutorProfile: (bio, categoryIds) => set((state) => ({
    users: state.users.map((user) => user.id === state.currentUserId ? { ...user, executorProfile: { ...user.executorProfile, bio, categoryIds } } : user),
  })),

  setTaskDraft: (patch) => set((state) => ({ taskDraft: { ...state.taskDraft, ...patch } })),
  resetTaskDraft: () => set({ taskDraft: clone(emptyDraft) }),

  publishDraft: () => {
    const state = get();
    const taskId = uid("task");
    const task = draftToTask(state.taskDraft, state.currentUserId, taskId, state.simulatedNow);
    set({ tasks: [task, ...state.tasks], taskDraft: clone(emptyDraft) });
    return taskId;
  },

  editTask: (taskId, patch) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId ? { ...task, ...patch, updatedAt: state.simulatedNow } : task) })),

  cancelTask: (taskId) => set((state) => ({
    tasks: state.tasks.map((task) => task.id === taskId ? transitionTask(task, TaskStatus.Cancelled, state.simulatedNow) : task),
  })),

  applyToTask: (taskId, message) => set((state) => {
    if (state.applications.some((application) => application.taskId === taskId && application.executorId === state.currentUserId)) return state;
    const application: Application = { id: uid("app"), taskId, executorId: state.currentUserId, message, status: ApplicationStatus.Submitted, createdAt: state.simulatedNow };
    const task = state.tasks.find((item) => item.id === taskId);
    const notification: Notification | null = task ? { id: uid("notif"), userId: task.requesterId, type: "new_application", title: "Nueva postulación", body: `Alguien se postuló a “${task.title}”.`, taskId, createdAt: state.simulatedNow } : null;
    return {
      applications: [application, ...state.applications],
      tasks: state.tasks.map((item) => item.id === taskId && item.status === TaskStatus.Published ? transitionTask(item, TaskStatus.WithApplicants, state.simulatedNow) : item),
      notifications: notification ? [notification, ...state.notifications] : state.notifications,
    };
  }),

  selectExecutor: (taskId, executorId) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return state;
    const agreementId = uid("agreement");
    const paymentId = uid("payment");
    const agreement: Agreement = {
      id: agreementId, taskId, requesterId: task.requesterId, executorId,
      originalTerms: { title: task.title, description: task.description, categoryId: task.categoryId, scheduledStartAt: task.scheduledStartAt, estimatedDurationMinutes: task.estimatedDurationMinutes, basePrice: task.price, district: task.location.public.district, conditions: task.conditions },
      acceptance: { requesterAccepted: true, executorAccepted: false, requesterAcceptedAt: state.simulatedNow }, extensions: [], createdAt: state.simulatedNow,
    };
    const payment: Payment = { id: paymentId, taskId, agreementId, type: PaymentType.Initial, amount: task.price, breakdown: calculatePaymentBreakdown(task.price), status: PaymentStatus.AwaitingMethod, createdAt: state.simulatedNow };
    const notification: Notification = { id: uid("notif"), userId: executorId, type: "executor_selected", title: "¡Te seleccionaron!", body: `Fuiste seleccionado para “${task.title}”. Revisa el acuerdo.`, taskId, createdAt: state.simulatedNow };
    return {
      tasks: state.tasks.map((item) => {
        if (item.id !== taskId) return item;
        const withExecutor = { ...item, selectedExecutorId: executorId, agreementId };
        const selected = item.status === TaskStatus.WithApplicants ? transitionTask(withExecutor, TaskStatus.ExecutorSelected, state.simulatedNow) : { ...withExecutor, status: TaskStatus.ExecutorSelected, updatedAt: state.simulatedNow };
        return transitionTask(selected, TaskStatus.PaymentPending, state.simulatedNow);
      }),
      applications: state.applications.map((application) => application.taskId === taskId ? { ...application, status: application.executorId === executorId ? ApplicationStatus.Selected : ApplicationStatus.NotSelected, resolvedAt: state.simulatedNow } : application),
      agreements: [agreement, ...state.agreements], payments: [payment, ...state.payments], notifications: [notification, ...state.notifications],
    };
  }),

  acceptAgreementAsExecutor: (agreementId) => set((state) => {
    const agreement = state.agreements.find((item) => item.id === agreementId);
    return {
      agreements: state.agreements.map((item) => item.id === agreementId ? { ...item, acceptance: { ...item.acceptance, executorAccepted: true, executorAcceptedAt: state.simulatedNow } } : item),
      tasks: state.tasks.map((task) => agreement && task.id === agreement.taskId && task.status === TaskStatus.ExecutorSelected ? transitionTask(task, TaskStatus.PaymentPending, state.simulatedNow) : task),
    };
  }),

  securePayment: (taskId, method) => {
    const shouldFail = get().nextPaymentShouldFail;
    set((state) => ({ payments: state.payments.map((payment) => payment.taskId === taskId && payment.type === PaymentType.Initial ? { ...payment, method, status: PaymentStatus.Processing } : payment) }));
    window.setTimeout(() => {
      set((state) => {
        const failed = shouldFail;
        const task = state.tasks.find((item) => item.id === taskId);
        const notification: Notification | null = !failed && task?.selectedExecutorId ? { id: uid("notif"), userId: task.selectedExecutorId, type: "payment_confirmed", title: "Pago asegurado", body: `La tarea “${task.title}” quedó confirmada. Ya puedes ver la dirección y usar el chat.`, taskId, createdAt: state.simulatedNow } : null;
        return {
          nextPaymentShouldFail: false,
          payments: state.payments.map((payment) => payment.taskId === taskId && payment.type === PaymentType.Initial ? { ...payment, status: failed ? PaymentStatus.Rejected : PaymentStatus.Secured, rejectedAt: failed ? state.simulatedNow : undefined, securedAt: failed ? undefined : state.simulatedNow } : payment),
          tasks: state.tasks.map((item) => item.id === taskId && !failed && item.status === TaskStatus.PaymentPending ? transitionTask(item, TaskStatus.Confirmed, state.simulatedNow) : item),
          notifications: notification ? [notification, ...state.notifications] : state.notifications,
        };
      });
    }, 900);
  },

  sendMessage: (taskId, content) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task || !task.selectedExecutorId || !content.trim()) return state;
    const recipientId = state.currentUserId === task.requesterId ? task.selectedExecutorId : task.requesterId;
    const message: ChatMessage = { id: uid("msg"), taskId, senderId: state.currentUserId, recipientId, content: content.trim(), sentAt: state.simulatedNow };
    return { messages: [...state.messages, message] };
  }),

  startTask: (taskId) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId && [TaskStatus.Confirmed, TaskStatus.Upcoming].includes(task.status) ? transitionTask(task, TaskStatus.InProgress, state.simulatedNow) : task) })),

  proposeExtension: (taskId, minutes, scope, amount) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task?.agreementId || amount <= 0) return state;
    const extension: AgreementExtension = { id: uid("extension"), additionalDurationMinutes: minutes, additionalScope: scope, additionalAmount: amount, status: ExtensionStatus.Proposed, proposedAt: state.simulatedNow };
    const notif: Notification | null = task.selectedExecutorId ? { id: uid("notif"), userId: task.selectedExecutorId, type: "extension_requested", title: "Ampliación solicitada", body: `Te propusieron ampliar “${task.title}” por S/${amount.toFixed(2)} adicionales.`, taskId, createdAt: state.simulatedNow } : null;
    return { agreements: state.agreements.map((agreement) => agreement.id === task.agreementId ? { ...agreement, extensions: [...agreement.extensions, extension] } : agreement), notifications: notif ? [notif, ...state.notifications] : state.notifications };
  }),

  respondExtension: (taskId, extensionId, accept) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task?.agreementId) return state;
    return { agreements: state.agreements.map((agreement) => agreement.id === task.agreementId ? { ...agreement, extensions: agreement.extensions.map((ext) => ext.id === extensionId ? { ...ext, status: accept ? ExtensionStatus.PaymentPending : ExtensionStatus.Rejected, resolvedAt: state.simulatedNow } : ext) } : agreement) };
  }),

  secureExtensionPayment: (taskId, extensionId) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    const agreement = state.agreements.find((item) => item.id === task?.agreementId);
    const extension = agreement?.extensions.find((item) => item.id === extensionId);
    if (!task || !agreement || !extension) return state;
    const paymentId = uid("payment");
    const payment: Payment = { id: paymentId, taskId, agreementId: agreement.id, extensionId, type: PaymentType.Extension, amount: extension.additionalAmount, breakdown: calculatePaymentBreakdown(extension.additionalAmount), method: "visa", status: PaymentStatus.Secured, createdAt: state.simulatedNow, securedAt: state.simulatedNow };
    return { payments: [payment, ...state.payments], agreements: state.agreements.map((item) => item.id === agreement.id ? { ...item, extensions: item.extensions.map((ext) => ext.id === extensionId ? { ...ext, status: ExtensionStatus.Secured, paymentId } : ext) } : item) };
  }),

  finishTask: (taskId) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    const notification: Notification | null = task ? { id: uid("notif"), userId: task.requesterId, type: "task_finished", title: "Trabajo marcado como terminado", body: `Revisa “${task.title}” para confirmar o reportar un problema.`, taskId, createdAt: state.simulatedNow } : null;
    return { tasks: state.tasks.map((item) => item.id === taskId && item.status === TaskStatus.InProgress ? transitionTask(item, TaskStatus.CompletionPending, state.simulatedNow) : item), notifications: notification ? [notification, ...state.notifications] : state.notifications };
  }),

  confirmCompletion: (taskId) => set((state) => ({
    tasks: state.tasks.map((task) => task.id === taskId && task.status === TaskStatus.CompletionPending ? transitionTask(task, TaskStatus.Completed, state.simulatedNow) : task),
    payments: state.payments.map((payment) => payment.taskId === taskId && payment.type === PaymentType.Initial ? { ...payment, status: PaymentStatus.Captured, capturedAt: state.simulatedNow } : payment),
  })),

  autoComplete: (taskId) => get().confirmCompletion(taskId),

  reportProblem: (taskId, reason, description) => set((state) => {
    const dispute: Dispute = { id: uid("dispute"), taskId, reportedByUserId: state.currentUserId, reason, description, createdAt: state.simulatedNow };
    const task = state.tasks.find((item) => item.id === taskId);
    const notification: Notification | null = task?.selectedExecutorId ? { id: uid("notif"), userId: task.selectedExecutorId, type: "problem_reported", title: "Problema reportado", body: `Se registró un problema en “${task.title}”.`, taskId, createdAt: state.simulatedNow } : null;
    return { disputes: [dispute, ...state.disputes], tasks: state.tasks.map((item) => item.id === taskId && [TaskStatus.InProgress, TaskStatus.CompletionPending].includes(item.status) ? transitionTask(item, TaskStatus.Disputed, state.simulatedNow) : item), notifications: notification ? [notification, ...state.notifications] : state.notifications };
  }),

  submitRating: (taskId, stars, comment) => set((state) => {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task?.selectedExecutorId) return state;
    const authorIsRequester = state.currentUserId === task.requesterId;
    const targetUserId = authorIsRequester ? task.selectedExecutorId : task.requesterId;
    const targetProfile: ProfileMode = authorIsRequester ? "executor" : "requester";
    const rating: Rating = { id: uid("rating"), taskId, authorUserId: state.currentUserId, targetUserId, targetProfile, stars, comment, eligibleAt: state.simulatedNow, submittedAt: state.simulatedNow, visibility: RatingVisibility.Hidden };
    const oppositeExists = state.ratings.some((item) => item.taskId === taskId && item.authorUserId === targetUserId);
    const ratings = oppositeExists ? [...state.ratings.map((item) => item.taskId === taskId ? { ...item, visibility: RatingVisibility.Revealed, revealedAt: state.simulatedNow } : item), { ...rating, visibility: RatingVisibility.Revealed, revealedAt: state.simulatedNow }] : [...state.ratings, rating];
    return { ratings };
  }),

  markNotificationRead: (notificationId) => set((state) => ({ notifications: state.notifications.map((notification) => notification.id === notificationId ? { ...notification, readAt: state.simulatedNow } : notification) })),
  setSimulatedNow: (value) => set({ simulatedNow: value }),
  forceNextPaymentFailure: (value) => set({ nextPaymentShouldFail: value }),
  simulateRatingDelay: (value) => set({ ratingDelayPassed: value }),
  forceTaskStatus: (taskId, status) => set((state) => ({ tasks: state.tasks.map((task) => task.id === taskId ? { ...task, status, updatedAt: state.simulatedNow } : task) })),

  resetDemo: () => set({
    activeProfile: "requester", simulatedNow: INITIAL_NOW, nextPaymentShouldFail: false, ratingDelayPassed: false,
    ...createMockDatabase(), taskDraft: clone(emptyDraft),
  }),
}));
