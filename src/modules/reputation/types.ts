import type { EntityId, ISODateString, ProfileMode } from "@/shared/types/common";

export type StarRating = 1 | 2 | 3 | 4 | 5;

export enum RatingVisibility {
  Pending = "Pendiente",
  Hidden = "Oculta",
  Revealed = "Visible",
  Expired = "Expirada",
}

export interface Rating {
  id: EntityId;
  taskId: EntityId;
  authorUserId: EntityId;
  targetUserId: EntityId;
  targetProfile: ProfileMode;
  stars: StarRating;
  comment?: string;
  eligibleAt: ISODateString;
  submittedAt?: ISODateString;
  visibility: RatingVisibility;
  revealedAt?: ISODateString;
}
