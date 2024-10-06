import { Endpoint } from "./project";

export class Kaja {
  readonly _internal: KajaInternal;

  constructor(onEndpointCallUpdate: EndpointCallUpdate) {
    this._internal = new KajaInternal(onEndpointCallUpdate);
  }

  guid(): string {
    return "xxx-yyy-zz";
  }

  info(message: string): void {}
}

export interface EndpointCall {
  endpoint: Endpoint;
  input: any;
  output?: any;
  error?: Error;
}

export interface EndpointCallUpdate {
  (endpointCall: EndpointCall): void;
}

class KajaInternal {
  #onEndpointCallUpdate: EndpointCallUpdate;

  constructor(onEndpointCallUpdate: EndpointCallUpdate) {
    this.#onEndpointCallUpdate = onEndpointCallUpdate;
  }

  endpointCallUpdate(endpointCall: EndpointCall) {
    this.#onEndpointCallUpdate(endpointCall);
  }
}
