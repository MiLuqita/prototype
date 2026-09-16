export type EntityId = string;
export type ISODateString = string;
export type ProfileMode = "requester" | "executor";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface RatingSummary {
  average: number | null;
  count: number;
}
