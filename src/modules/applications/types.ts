import type { EntityId, ISODateString } from "@/shared/types/common";

export enum ApplicationStatus {
  Submitted = "Postulado",
  Selected = "Seleccionado",
  NotSelected = "No seleccionado",
}

export interface Application {
  id: EntityId;
  taskId: EntityId;
  executorId: EntityId;
  message?: string;
  status: ApplicationStatus;
  createdAt: ISODateString;
  resolvedAt?: ISODateString;
}
