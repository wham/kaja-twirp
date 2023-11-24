import { TwirpContext, TwirpServer, RouterEvents, TwirpError, TwirpErrorCode, Interceptor, TwirpContentType, chainInterceptors } from "twirp-ts";
import { BoostrapRequest, BootstrapResponse, BootstrapProgressRequest, BootstrapProgressResponse } from "./api";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(service: string, method: string, contentType: "application/json" | "application/protobuf", data: object | Uint8Array): Promise<object | Uint8Array>;
}

export interface ApiClient {
  Bootstrap(request: BoostrapRequest): Promise<BootstrapResponse>;
  BootstrapProgress(request: BootstrapProgressRequest): Promise<BootstrapProgressResponse>;
}

export class ApiClientJSON implements ApiClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Bootstrap.bind(this);
    this.BootstrapProgress.bind(this);
  }
  Bootstrap(request: BoostrapRequest): Promise<BootstrapResponse> {
    const data = BoostrapRequest.toJson(request, { useProtoFieldName: true, emitDefaultValues: false });
    const promise = this.rpc.request("Api", "Bootstrap", "application/json", data as object);
    return promise.then((data) => BootstrapResponse.fromJson(data as any, { ignoreUnknownFields: true }));
  }

  BootstrapProgress(request: BootstrapProgressRequest): Promise<BootstrapProgressResponse> {
    const data = BootstrapProgressRequest.toJson(request, { useProtoFieldName: true, emitDefaultValues: false });
    const promise = this.rpc.request("Api", "BootstrapProgress", "application/json", data as object);
    return promise.then((data) => BootstrapProgressResponse.fromJson(data as any, { ignoreUnknownFields: true }));
  }
}

export class ApiClientProtobuf implements ApiClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Bootstrap.bind(this);
    this.BootstrapProgress.bind(this);
  }
  Bootstrap(request: BoostrapRequest): Promise<BootstrapResponse> {
    const data = BoostrapRequest.toBinary(request);
    const promise = this.rpc.request("Api", "Bootstrap", "application/protobuf", data);
    return promise.then((data) => BootstrapResponse.fromBinary(data as Uint8Array));
  }

  BootstrapProgress(request: BootstrapProgressRequest): Promise<BootstrapProgressResponse> {
    const data = BootstrapProgressRequest.toBinary(request);
    const promise = this.rpc.request("Api", "BootstrapProgress", "application/protobuf", data);
    return promise.then((data) => BootstrapProgressResponse.fromBinary(data as Uint8Array));
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface ApiTwirp<T extends TwirpContext = TwirpContext> {
  Bootstrap(ctx: T, request: BoostrapRequest): Promise<BootstrapResponse>;
  BootstrapProgress(ctx: T, request: BootstrapProgressRequest): Promise<BootstrapProgressResponse>;
}

export enum ApiMethod {
  Bootstrap = "Bootstrap",
  BootstrapProgress = "BootstrapProgress",
}

export const ApiMethodList = [ApiMethod.Bootstrap, ApiMethod.BootstrapProgress];

export function createApiServer<T extends TwirpContext = TwirpContext>(service: ApiTwirp<T>) {
  return new TwirpServer<ApiTwirp, T>({
    service,
    packageName: "",
    serviceName: "Api",
    methodList: ApiMethodList,
    matchRoute: matchApiRoute,
  });
}

function matchApiRoute<T extends TwirpContext = TwirpContext>(method: string, events: RouterEvents<T>) {
  switch (method) {
    case "Bootstrap":
      return async (ctx: T, service: ApiTwirp, data: Buffer, interceptors?: Interceptor<T, BoostrapRequest, BootstrapResponse>[]) => {
        ctx = { ...ctx, methodName: "Bootstrap" };
        await events.onMatch(ctx);
        return handleApiBootstrapRequest(ctx, service, data, interceptors);
      };
    case "BootstrapProgress":
      return async (ctx: T, service: ApiTwirp, data: Buffer, interceptors?: Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>[]) => {
        ctx = { ...ctx, methodName: "BootstrapProgress" };
        await events.onMatch(ctx);
        return handleApiBootstrapProgressRequest(ctx, service, data, interceptors);
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleApiBootstrapRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BoostrapRequest, BootstrapResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleApiBootstrapJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleApiBootstrapProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleApiBootstrapProgressRequest<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleApiBootstrapProgressJSON<T>(ctx, service, data, interceptors);
    case TwirpContentType.Protobuf:
      return handleApiBootstrapProgressProtobuf<T>(ctx, service, data, interceptors);
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleApiBootstrapJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BoostrapRequest, BootstrapResponse>[]
) {
  let request: BoostrapRequest;
  let response: BootstrapResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = BoostrapRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<T, BoostrapRequest, BootstrapResponse>;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Bootstrap(ctx, inputReq);
    });
  } else {
    response = await service.Bootstrap(ctx, request!);
  }

  return JSON.stringify(BootstrapResponse.toJson(response, { useProtoFieldName: true, emitDefaultValues: false }) as string);
}

async function handleApiBootstrapProgressJSON<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>[]
) {
  let request: BootstrapProgressRequest;
  let response: BootstrapProgressResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = BootstrapProgressRequest.fromJson(body, { ignoreUnknownFields: true });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.BootstrapProgress(ctx, inputReq);
    });
  } else {
    response = await service.BootstrapProgress(ctx, request!);
  }

  return JSON.stringify(BootstrapProgressResponse.toJson(response, { useProtoFieldName: true, emitDefaultValues: false }) as string);
}
async function handleApiBootstrapProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BoostrapRequest, BootstrapResponse>[]
) {
  let request: BoostrapRequest;
  let response: BootstrapResponse;

  try {
    request = BoostrapRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<T, BoostrapRequest, BootstrapResponse>;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.Bootstrap(ctx, inputReq);
    });
  } else {
    response = await service.Bootstrap(ctx, request!);
  }

  return Buffer.from(BootstrapResponse.toBinary(response));
}

async function handleApiBootstrapProgressProtobuf<T extends TwirpContext = TwirpContext>(
  ctx: T,
  service: ApiTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>[]
) {
  let request: BootstrapProgressRequest;
  let response: BootstrapProgressResponse;

  try {
    request = BootstrapProgressRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<T, BootstrapProgressRequest, BootstrapProgressResponse>;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.BootstrapProgress(ctx, inputReq);
    });
  } else {
    response = await service.BootstrapProgress(ctx, request!);
  }

  return Buffer.from(BootstrapProgressResponse.toBinary(response));
}
