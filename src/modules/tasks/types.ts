import type { EntityId, GeoPoint, ISODateString } from "@/shared/types/common";

export enum TaskStatus {
  Draft = "Borrador",
  Published = "Publicada",
  WithApplicants = "Con postulantes",
  ExecutorSelected = "Ejecutor seleccionado",
  PaymentPending = "Pago pendiente",
  Confirmed = "Confirmada",
  Upcoming = "Próxima",
  InProgress = "En curso",
  CompletionPending = "Finalización pendiente",
  Disputed = "En disputa",
  Completed = "Completada",
  Cancelled = "Cancelada",
}

export interface TaskCategory {
  id: EntityId;
  name: string;
  slug: string;
  icon: string;
}

export interface PublicTaskLocation {
  district: string;
  zoneLabel?: string;
  approximatePoint: GeoPoint;
}

export interface PrivateTaskLocation {
  exactAddress: string;
  reference?: string;
  exactPoint: GeoPoint;
}

export interface TaskLocation {
  public: PublicTaskLocation;
  private: PrivateTaskLocation;
}

export interface PublicLocationView {
  district: string;
  zoneLabel?: string;
  approximateDistanceKm: number;
}

export interface RevealedLocationView extends PublicLocationView {
  exactAddress: string;
  reference?: string;
  exactPoint: GeoPoint;
}

export interface Task {
  id: EntityId;
  requesterId: EntityId;
  selectedExecutorId?: EntityId;
  title: string;
  description: string;
  categoryId: EntityId;
  price: number;
  scheduledStartAt: ISODateString;
  estimatedDurationMinutes: number;
  location: TaskLocation;
  photoUrls: string[];
  conditions: string[];
  status: TaskStatus;
  agreementId?: EntityId;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  cancelledAt?: ISODateString;
}

export interface TaskDraft {
  title: string;
  description: string;
  categoryId: EntityId;
  price: number;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDurationMinutes: number;
  useCurrentLocation: boolean;
  district: string;
  exactAddress: string;
  reference: string;
  conditions: string;
}
