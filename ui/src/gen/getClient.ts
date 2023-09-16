import { QuirksClient } from "./quirks.client";
import { SearchServiceClient } from "./search-service.client";
import { RpcTransport, ServiceInfo } from "@protobuf-ts/runtime-rpc";

export function getClient(
  name: string,
  transport: RpcTransport
): ServiceInfo | undefined {
  switch (name) {
    case "SearchServiceClient":
      return new SearchServiceClient(transport);
    case "QuirksClient":
      return new QuirksClient(transport);
  }

  return undefined;
}
