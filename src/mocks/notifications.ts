import type { Notification } from "@/modules/notifications/types";

export const mockNotifications: Notification[] = [
  { id: "n1", userId: "u-demo", type: "new_application", title: "Nueva postulación", body: "Carlos se postuló a tu tarea de armado.", taskId: "t-demo-pay", createdAt: "2026-09-09T08:40:00-05:00" },
  { id: "n2", userId: "u-demo", type: "task_finished", title: "Trabajo marcado como terminado", body: "Lucía indicó que terminó la limpieza. Revísala antes de confirmar.", taskId: "t-demo-finish", createdAt: "2026-09-09T17:36:00-05:00" },
  { id: "n3", userId: "u-demo", type: "task_upcoming", title: "Tarea próxima", body: "El paseo de Nala comienza mañana a las 8:00 a. m.", taskId: "t-demo-upcoming", createdAt: "2026-09-09T18:00:00-05:00" },
  { id: "n4", userId: "u-demo", type: "new_message", title: "Nuevo mensaje", body: "Pamela te escribió sobre la tarea de mañana.", taskId: "t-demo-upcoming", createdAt: "2026-09-09T18:20:00-05:00", readAt: "2026-09-09T18:25:00-05:00" },
  { id: "n5", userId: "u-demo", type: "rating_available", title: "Ya puedes calificar", body: "Tu calificación de la entrega de documentos ya está disponible.", taskId: "t-demo-done", createdAt: "2026-09-08T13:30:00-05:00" },
  { id: "n6", userId: "u-demo", type: "problem_reported", title: "Caso en revisión", body: "Registramos el problema reportado en la tarea de pintura.", taskId: "t-demo-dispute", createdAt: "2026-09-07T14:21:00-05:00" },
  { id: "n7", userId: "u-demo", type: "executor_selected", title: "Te seleccionaron", body: "Fuiste seleccionado para un apoyo en evento familiar.", taskId: "t-010", createdAt: "2026-09-09T19:00:00-05:00" },
];
