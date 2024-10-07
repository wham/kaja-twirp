import { TwirpFetchTransport } from "@protobuf-ts/twirp-transport";
import { MethodCall } from "./kaja";
import { Client, Project, Service } from "./project";
import { Stub } from "./sources";

export function createClient(project: Project, service: Service, stub: Stub): Client {
  const client: Client = {};
  const url = new URL(window.location.href);
  const urlWithoutPath = `${url.protocol}//${url.hostname}${url.port ? ":" + url.port : ""}`;
  const transport = new TwirpFetchTransport({
    baseUrl: urlWithoutPath + "/twirp",
  });
  const clientStub = stub[service.name + "Client"];

  for (const method of service.methods) {
    client[method.name] = async (input: any) => {
      const methodCall: MethodCall = {
        service,
        method,
        input,
      };
      project.kaja?._internal.methodCallUpdate(methodCall);

      try {
        let { response } = await clientStub[lcfirst(method.name)](input);
        methodCall.output = response;
      } catch (error) {
        methodCall.error = error;
      }

      project.kaja?._internal.methodCallUpdate(methodCall);
    };
  }

  return client;
}

function lcfirst(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
