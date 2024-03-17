// @generated by protobuf-ts 2.9.1
// @generated from protobuf file "api.proto" (syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { Api } from "./api";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { BootstrapResponse } from "./api";
import type { BootstrapRequest } from "./api";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service Api
 */
export interface IApiClient {
    /**
     * @generated from protobuf rpc: Bootstrap(BootstrapRequest) returns (BootstrapResponse);
     */
    bootstrap(input: BootstrapRequest, options?: RpcOptions): UnaryCall<BootstrapRequest, BootstrapResponse>;
}
/**
 * @generated from protobuf service Api
 */
export class ApiClient implements IApiClient, ServiceInfo {
    typeName = Api.typeName;
    methods = Api.methods;
    options = Api.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: Bootstrap(BootstrapRequest) returns (BootstrapResponse);
     */
    bootstrap(input: BootstrapRequest, options?: RpcOptions): UnaryCall<BootstrapRequest, BootstrapResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<BootstrapRequest, BootstrapResponse>("unary", this._transport, method, opt, input);
    }
}