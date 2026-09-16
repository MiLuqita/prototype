import { ExtensionStatus, type Agreement } from "@/modules/agreements/types";

export const mockAgreements: Agreement[] = [
  {
    id: "a-exec-selected", taskId: "t-exec-selected", requesterId: "u-ana", executorId: "u-demo",
    originalTerms: { title: "Ayudar a instalar una repisa", description: "Sostener, medir y apoyar durante la instalación de una repisa de 1.5 m.", categoryId: "cat-furniture", scheduledStartAt: "2026-09-11T11:00:00-05:00", estimatedDurationMinutes: 90, basePrice: 55, district: "Magdalena", conditions: ["La solicitante tiene taladro y fijaciones."] },
    acceptance: { requesterAccepted: true, executorAccepted: false, requesterAcceptedAt: "2026-09-09T12:00:00-05:00" }, extensions: [], createdAt: "2026-09-09T12:00:00-05:00",
  },
  {
    id: "a-exec-active", taskId: "t-exec-active", requesterId: "u-sofia", executorId: "u-demo",
    originalTerms: { title: "Apoyo para preparar sala de reunión", description: "Mover sillas, montar dos mesas y dejar bebidas ordenadas antes de una reunión.", categoryId: "cat-events", scheduledStartAt: "2026-09-09T19:00:00-05:00", estimatedDurationMinutes: 150, basePrice: 90, district: "San Isidro", conditions: ["No se requiere cargar objetos de más de 15 kg."] },
    acceptance: { requesterAccepted: true, executorAccepted: true },
    extensions: [
      { id: "ex-exec-proposed", additionalDurationMinutes: 30, additionalScope: "Quedarse 30 minutos adicionales para ayudar a ordenar al terminar el montaje.", additionalAmount: 20, status: ExtensionStatus.Proposed, proposedAt: "2026-09-09T20:15:00-05:00" },
      { id: "ex-exec-secured", additionalDurationMinutes: 30, additionalScope: "Recibir y acomodar dos bandejas adicionales del catering.", additionalAmount: 15, status: ExtensionStatus.Secured, proposedAt: "2026-09-09T19:45:00-05:00", resolvedAt: "2026-09-09T19:50:00-05:00", paymentId: "p-exec-extension" }
    ], createdAt: "2026-09-08T13:00:00-05:00",
  },
  {
    id: "a-exec-done", taskId: "t-exec-done", requesterId: "u-carlos", executorId: "u-demo",
    originalTerms: { title: "Entregar paquete en Miraflores", description: "Entrega pequeña realizada y confirmada correctamente.", categoryId: "cat-delivery", scheduledStartAt: "2026-09-08T16:00:00-05:00", estimatedDurationMinutes: 60, basePrice: 38, district: "Miraflores", conditions: ["Paquete pequeño y cerrado."] },
    acceptance: { requesterAccepted: true, executorAccepted: true }, extensions: [], createdAt: "2026-09-07T13:00:00-05:00",
  },
  {
    id: "a-exec-upcoming", taskId: "t-exec-upcoming", requesterId: "u-lucia", executorId: "u-demo",
    originalTerms: { title: "Apoyo para ordenar cajas de almacén", description: "Ordenar unas 25 cajas por etiqueta y dejarlas agrupadas. Nada pesado.", categoryId: "cat-moving", scheduledStartAt: "2026-09-10T13:00:00-05:00", estimatedDurationMinutes: 120, basePrice: 75, district: "Miraflores", conditions: ["No hay cajas de más de 12 kg."] },
    acceptance: { requesterAccepted: true, executorAccepted: true, requesterAcceptedAt: "2026-09-08T16:00:00-05:00", executorAcceptedAt: "2026-09-08T16:20:00-05:00" }, extensions: [], createdAt: "2026-09-08T16:00:00-05:00",
  },
  {
    id: "a-demo-pay", taskId: "t-demo-pay", requesterId: "u-demo", executorId: "u-carlos",
    originalTerms: { title: "Armar mesa de comedor", description: "Mesa nueva de 6 puestos. Armado y ajuste final.", categoryId: "cat-furniture", scheduledStartAt: "2026-09-10T19:00:00-05:00", estimatedDurationMinutes: 120, basePrice: 100, district: "Santiago de Surco", conditions: ["Armado completo y ajuste final."] },
    acceptance: { requesterAccepted: true, executorAccepted: true, requesterAcceptedAt: "2026-09-09T09:02:00-05:00", executorAcceptedAt: "2026-09-09T09:10:00-05:00" },
    extensions: [], createdAt: "2026-09-09T09:00:00-05:00",
  },
  {
    id: "a-demo-upcoming", taskId: "t-demo-upcoming", requesterId: "u-demo", executorId: "u-pamela",
    originalTerms: { title: "Pasear a Nala", description: "Paseo de una hora por el parque.", categoryId: "cat-pets", scheduledStartAt: "2026-09-10T08:00:00-05:00", estimatedDurationMinutes: 60, basePrice: 40, district: "Santiago de Surco", conditions: ["Usar el arnés de Nala."] },
    acceptance: { requesterAccepted: true, executorAccepted: true }, extensions: [], createdAt: "2026-09-08T18:00:00-05:00",
  },
  {
    id: "a-demo-active", taskId: "t-demo-active", requesterId: "u-demo", executorId: "u-jose",
    originalTerms: { title: "Ordenar jardín posterior", description: "Retirar hojas, podar arbustos y ordenar macetas.", categoryId: "cat-garden", scheduledStartAt: "2026-09-09T18:30:00-05:00", estimatedDurationMinutes: 180, basePrice: 120, district: "Santiago de Surco", conditions: ["Recojo de residuos incluido."] },
    acceptance: { requesterAccepted: true, executorAccepted: true },
    extensions: [{ id: "ex-active-1", additionalDurationMinutes: 60, additionalScope: "Podar también el cerco lateral y retirar las ramas.", additionalAmount: 35, status: ExtensionStatus.Proposed, proposedAt: "2026-09-09T20:10:00-05:00" }],
    createdAt: "2026-09-08T17:00:00-05:00",
  },
  {
    id: "a-demo-finish", taskId: "t-demo-finish", requesterId: "u-demo", executorId: "u-lucia",
    originalTerms: { title: "Limpieza de sala y cocina", description: "Limpieza general después de una reunión.", categoryId: "cat-cleaning", scheduledStartAt: "2026-09-09T15:00:00-05:00", estimatedDurationMinutes: 150, basePrice: 85, district: "Santiago de Surco", conditions: ["Incluye superficies y pisos."] },
    acceptance: { requesterAccepted: true, executorAccepted: true }, extensions: [], createdAt: "2026-09-08T11:00:00-05:00",
  },
  {
    id: "a-demo-done", taskId: "t-demo-done", requesterId: "u-demo", executorId: "u-renzo",
    originalTerms: { title: "Entrega de documentos", description: "Recoger documentos y entregarlos en recepción.", categoryId: "cat-delivery", scheduledStartAt: "2026-09-08T11:00:00-05:00", estimatedDurationMinutes: 75, basePrice: 45, district: "Santiago de Surco", conditions: ["Sobre cerrado."] },
    acceptance: { requesterAccepted: true, executorAccepted: true }, extensions: [], createdAt: "2026-09-07T17:00:00-05:00",
  },
  {
    id: "a-demo-dispute", taskId: "t-demo-dispute", requesterId: "u-demo", executorId: "u-bruno",
    originalTerms: { title: "Pintar pared del dormitorio", description: "Pintar pared principal del dormitorio en color crema.", categoryId: "cat-paint", scheduledStartAt: "2026-09-07T10:00:00-05:00", estimatedDurationMinutes: 180, basePrice: 90, district: "Santiago de Surco", conditions: ["Una pared completa."] },
    acceptance: { requesterAccepted: true, executorAccepted: true }, extensions: [], createdAt: "2026-09-06T14:00:00-05:00",
  },
];
