import type { Resource } from "./Resource"

export interface ResourceList {
  count: numer,
  next: string | null,
  previous: string | null,
  results: Array<Resource>
}