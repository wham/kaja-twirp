import { FetchRPC } from "twirp-ts";
import { ApiClient, ApiClientJSON } from "../shared/api.twirp";

export function getApiClient(): ApiClient {
  return new ApiClientJSON(
    FetchRPC({
      baseUrl: getBaseUrl(),
    })
  )
}

export function getBaseUrl(): string {
  const url = new URL(window.location.href);
  return url.origin + "/api";
}