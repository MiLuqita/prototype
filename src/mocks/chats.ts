import type { ChatMessage } from "@/modules/notifications/types";

export const mockChats: ChatMessage[] = [
  { id: "m-exec-active-1", taskId: "t-exec-active", senderId: "u-sofia", recipientId: "u-demo", content: "Gracias por llegar puntual. Te envié una ampliación de 30 minutos para que la revises.", sentAt: "2026-09-09T20:16:00-05:00" },
  { id: "m-exec-1", taskId: "t-exec-upcoming", senderId: "u-lucia", recipientId: "u-demo", content: "Hola Valeria, ya quedó confirmado. En recepción tendrán tu nombre.", sentAt: "2026-09-09T16:00:00-05:00" },
  { id: "m1", taskId: "t-demo-upcoming", senderId: "u-pamela", recipientId: "u-demo", content: "¡Hola! Ya vi la indicación del arnés. Mañana llego unos minutos antes.", sentAt: "2026-09-09T18:20:00-05:00" },
  { id: "m2", taskId: "t-demo-upcoming", senderId: "u-demo", recipientId: "u-pamela", content: "Perfecto, te espero en portería. Gracias.", sentAt: "2026-09-09T18:25:00-05:00" },
  { id: "m3", taskId: "t-demo-active", senderId: "u-jose", recipientId: "u-demo", content: "Ya terminé la parte del fondo. El cerco lateral tomaría una hora adicional.", sentAt: "2026-09-09T20:05:00-05:00" },
  { id: "m4", taskId: "t-demo-active", senderId: "u-demo", recipientId: "u-jose", content: "Te mandé la ampliación por la app para que la revises.", sentAt: "2026-09-09T20:11:00-05:00" },
  { id: "m5", taskId: "t-demo-finish", senderId: "u-lucia", recipientId: "u-demo", content: "Listo, dejé la cocina y sala terminadas. Marqué la tarea como finalizada.", sentAt: "2026-09-09T17:35:00-05:00" },
];
