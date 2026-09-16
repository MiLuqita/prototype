import type { TaskCategory } from "@/modules/tasks/types";

export const mockCategories: TaskCategory[] = [
  { id: "cat-furniture", name: "Armado de muebles", slug: "armado-muebles", icon: "🪑" },
  { id: "cat-cleaning", name: "Limpieza", slug: "limpieza", icon: "🧹" },
  { id: "cat-moving", name: "Mudanza", slug: "mudanza", icon: "📦" },
  { id: "cat-garden", name: "Jardinería", slug: "jardineria", icon: "🌿" },
  { id: "cat-plumbing", name: "Gasfitería", slug: "gasfiteria", icon: "🔧" },
  { id: "cat-delivery", name: "Delivery / mandados", slug: "delivery", icon: "🛵" },
  { id: "cat-paint", name: "Pintura", slug: "pintura", icon: "🖌️" },
  { id: "cat-tech", name: "Computación", slug: "computacion", icon: "💻" },
  { id: "cat-pets", name: "Mascotas", slug: "mascotas", icon: "🐕" },
  { id: "cat-events", name: "Apoyo en eventos", slug: "eventos", icon: "🎉" },
];
