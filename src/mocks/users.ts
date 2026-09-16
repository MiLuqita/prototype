import type { User } from "@/modules/users/types";

const r = (average: number | null, count: number) => ({ average, count });

export const mockUsers: User[] = [
  {
    id: "u-demo", firstName: "Valeria", lastName: "Quispe", avatarUrl: null, district: "Santiago de Surco", joinedAt: "2026-01-15T10:00:00-05:00",
    requesterProfile: { reputation: r(4.8, 12), tasksPublished: 17, tasksCompleted: 14 },
    executorProfile: { bio: "Ordenada, puntual y con experiencia apoyando en eventos y mandados.", categoryIds: ["cat-events", "cat-delivery", "cat-pets"], reputation: r(4.6, 8), completedJobs: 9 },
  },
  {
    id: "u-carlos", firstName: "Carlos", lastName: "Mendoza", avatarUrl: null, district: "San Borja", joinedAt: "2025-11-02T12:00:00-05:00",
    requesterProfile: { reputation: r(4.7, 9), tasksPublished: 11, tasksCompleted: 10 },
    executorProfile: { bio: "Técnico independiente. Armado muebles y hago reparaciones menores con mis propias herramientas.", categoryIds: ["cat-furniture", "cat-plumbing"], reputation: r(4.8, 31), completedJobs: 36 },
  },
  {
    id: "u-lucia", firstName: "Lucía", lastName: "Ramos", avatarUrl: null, district: "Miraflores", joinedAt: "2026-02-11T09:30:00-05:00",
    requesterProfile: { reputation: r(4.9, 14), tasksPublished: 16, tasksCompleted: 15 },
    executorProfile: { bio: "Me gusta dejar los espacios impecables. Disponible tardes y fines de semana.", categoryIds: ["cat-cleaning", "cat-pets"], reputation: r(4.6, 22), completedJobs: 24 },
  },
  {
    id: "u-jose", firstName: "José", lastName: "Salazar", avatarUrl: null, district: "La Molina", joinedAt: "2025-09-20T16:00:00-05:00",
    requesterProfile: { reputation: r(4.3, 6), tasksPublished: 8, tasksCompleted: 6 },
    executorProfile: { bio: "Jardinería, poda y mantenimiento. Trabajo con cuidado y puntualidad.", categoryIds: ["cat-garden", "cat-moving"], reputation: r(4.8, 47), completedJobs: 52 },
  },
  {
    id: "u-maria", firstName: "María", lastName: "Paredes", avatarUrl: null, district: "Jesús María", joinedAt: "2026-03-08T11:00:00-05:00",
    requesterProfile: { reputation: r(4.6, 5), tasksPublished: 6, tasksCompleted: 5 },
    executorProfile: { bio: "Apoyo en mudanzas pequeñas y organización de espacios.", categoryIds: ["cat-moving", "cat-cleaning"], reputation: r(4.5, 13), completedJobs: 15 },
  },
  {
    id: "u-diego", firstName: "Diego", lastName: "Torres", avatarUrl: null, district: "Barranco", joinedAt: "2026-06-01T15:00:00-05:00",
    requesterProfile: { reputation: r(null, 0), tasksPublished: 0, tasksCompleted: 0 },
    executorProfile: { bio: "Estudiante de sistemas. Configuro laptops, impresoras y redes domésticas.", categoryIds: ["cat-tech", "cat-delivery"], reputation: r(null, 0), completedJobs: 0 },
  },
  {
    id: "u-ana", firstName: "Ana", lastName: "Vargas", avatarUrl: null, district: "Magdalena", joinedAt: "2025-12-12T10:00:00-05:00",
    requesterProfile: { reputation: r(4.8, 18), tasksPublished: 21, tasksCompleted: 19 },
    executorProfile: { bio: "Pintura interior y acabados sencillos.", categoryIds: ["cat-paint", "cat-cleaning"], reputation: r(4.3, 11), completedJobs: 13 },
  },
  {
    id: "u-renzo", firstName: "Renzo", lastName: "Gutiérrez", avatarUrl: null, district: "San Miguel", joinedAt: "2026-01-28T10:00:00-05:00",
    requesterProfile: { reputation: r(4.7, 4), tasksPublished: 5, tasksCompleted: 4 },
    executorProfile: { bio: "Movilidad propia para mandados y entregas dentro de Lima moderna.", categoryIds: ["cat-delivery", "cat-moving"], reputation: r(4.7, 29), completedJobs: 34 },
  },
  {
    id: "u-pamela", firstName: "Pamela", lastName: "Flores", avatarUrl: null, district: "Surquillo", joinedAt: "2025-10-17T10:00:00-05:00",
    requesterProfile: { reputation: r(4.6, 7), tasksPublished: 9, tasksCompleted: 8 },
    executorProfile: { bio: "Cuido mascotas y apoyo en eventos pequeños.", categoryIds: ["cat-pets", "cat-events"], reputation: r(4.9, 38), completedJobs: 42 },
  },
  {
    id: "u-edgar", firstName: "Edgar", lastName: "Huamán", avatarUrl: null, district: "Pueblo Libre", joinedAt: "2025-08-19T10:00:00-05:00",
    requesterProfile: { reputation: r(4.5, 10), tasksPublished: 13, tasksCompleted: 11 },
    executorProfile: { bio: "Gasfitero con experiencia en instalaciones y reparaciones domésticas.", categoryIds: ["cat-plumbing", "cat-furniture"], reputation: r(4.6, 55), completedJobs: 63 },
  },
  {
    id: "u-sofia", firstName: "Sofía", lastName: "Núñez", avatarUrl: null, district: "San Isidro", joinedAt: "2026-04-02T10:00:00-05:00",
    requesterProfile: { reputation: r(4.8, 8), tasksPublished: 10, tasksCompleted: 9 },
    executorProfile: { bio: "Organización, limpieza y apoyo logístico para reuniones.", categoryIds: ["cat-cleaning", "cat-events"], reputation: r(4.8, 17), completedJobs: 18 },
  },
  {
    id: "u-bruno", firstName: "Bruno", lastName: "Chávez", avatarUrl: null, district: "Lince", joinedAt: "2026-05-21T10:00:00-05:00",
    requesterProfile: { reputation: r(4.4, 3), tasksPublished: 4, tasksCompleted: 3 },
    executorProfile: { bio: "Manos a la obra: muebles, pintura y mudanzas cortas.", categoryIds: ["cat-furniture", "cat-paint", "cat-moving"], reputation: r(4.4, 7), completedJobs: 8 },
  },
];
