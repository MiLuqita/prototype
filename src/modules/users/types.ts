import type { EntityId, ISODateString, RatingSummary } from "@/shared/types/common";

export interface RequesterProfile {
  reputation: RatingSummary;
  tasksPublished: number;
  tasksCompleted: number;
}

export interface ExecutorProfile {
  bio: string;
  categoryIds: EntityId[];
  reputation: RatingSummary;
  completedJobs: number;
}

export interface User {
  id: EntityId;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  district: string;
  joinedAt: ISODateString;
  requesterProfile: RequesterProfile;
  executorProfile: ExecutorProfile;
}
