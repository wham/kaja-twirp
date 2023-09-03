import * as ts from "typescript";
import {
  CodeGeneratorRequest,
  DescriptorRegistry,
  GeneratedFile,
  MethodDescriptorProto,
  PluginBase,
  ServiceDescriptorProto,
  SymbolTable,
  TypeScriptImports,
  TypescriptFile,
} from "@protobuf-ts/plugin-framework";

import { ServiceClientGeneratorGeneric } from "@protobuf-ts/plugin/build/code-gen/service-client-generator-generic";
import { CommentGenerator } from "@protobuf-ts/plugin/build/code-gen/comment-generator";
import { createLocalTypeName } from "@protobuf-ts/plugin/build/code-gen/local-type-name";
import { Interpreter } from "@protobuf-ts/plugin/build/interpreter";
import { makeInternalOptions } from "@protobuf-ts/plugin/build/our-options";

export class Plugin extends PluginBase {
  // https://github.dev/timostamm/protobuf-ts
  generate(request: CodeGeneratorRequest): GeneratedFile[] | Promise<GeneratedFile[]> {
    const registry = DescriptorRegistry.createFrom(request);
    const symbols = new SymbolTable(),
      imports = new TypeScriptImports(symbols),
      comments = new CommentGenerator(registry),
      options = makeInternalOptions(),
      interpreter = new Interpreter(registry, options);

    let file = new TypescriptFile("kaja-twirp.ts");
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    const importDeclaration = ts.createImportDeclaration(
      undefined,
      undefined,
      ts.createImportClause(undefined, ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier("TwirpFetchTransport"))])),
      ts.createStringLiteral("@protobuf-ts/twirp-transport")
    );

    file.addStatement(importDeclaration);

    for (let fileDescriptor of registry.allFiles()) {
      registry.visitTypes(fileDescriptor, (descriptor) => {
        if (ServiceDescriptorProto.is(descriptor) && descriptor.name) {
          const cname = descriptor.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

          const importDeclaration = ts.createImportDeclaration(
            undefined,
            undefined,
            ts.createImportClause(undefined, ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier(descriptor.name + "Client"))])),
            ts.createStringLiteral("./" + cname + ".client")
          );

          file.addStatement(importDeclaration);
        }
      });
    }

    const model = ts.createVariableStatement(
      [ts.createToken(ts.SyntaxKind.ExportKeyword)],
      ts.createVariableDeclarationList(
        [
          ts.createVariableDeclaration(
            ts.createIdentifier("model"),
            undefined,
            ts.createObjectLiteral([
              ts.createPropertyAssignment("services", this.services(request, file, printer, interpreter, registry)),
              ts.createPropertyAssignment("extraLibs", this.extraLibs(registry, printer)),
            ])
          ),
        ],
        ts.NodeFlags.Const
      )
    );

    file.addStatement(model);

    return [file];
  }

  private services(
    request: CodeGeneratorRequest,
    file: TypescriptFile,
    printer: ts.Printer,
    interpreter: Interpreter,
    registry: DescriptorRegistry
  ): ts.ArrayLiteralExpression {
    const services = [];

    for (let protoFile of request.protoFile) {
      for (let protoService of protoFile.service) {
        if (!protoService.name) {
          continue;
        }

        services.push(this.service(protoService, file, printer, interpreter, registry));
      }
    }

    return ts.createArrayLiteral(services);
  }

  private service(
    protoService: ServiceDescriptorProto,
    file: TypescriptFile,
    printer: ts.Printer,
    interpreter: Interpreter,
    registry: DescriptorRegistry
  ): ts.ObjectLiteralExpression {
    const methods = [];

    for (let protoMethod of protoService.method) {
      if (!protoMethod.name) {
        continue;
      }

      const propeties = [
        ts.createPropertyAssignment("name", ts.createStringLiteral(protoMethod.name)),
        ts.createPropertyAssignment("code", ts.createStringLiteral(this.code(protoMethod, protoService, printer))),
      ];

      const method = ts.createObjectLiteral(propeties);

      methods.push(method);
    }

    const proxy = this.proxy(protoService, interpreter, registry);
    const extraLib = ts.createVariableStatement(
      undefined,
      ts.createVariableDeclarationList([ts.createVariableDeclaration(ts.createIdentifier(protoService.name!), undefined, proxy)], ts.NodeFlags.Const)
    );
    let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    sourceFile = ts.updateSourceFileNode(sourceFile, [extraLib]);

    return ts.createObjectLiteral([
      ts.createPropertyAssignment("name", ts.createStringLiteral(protoService.name!)),
      ts.createPropertyAssignment("methods", ts.createArrayLiteral(methods)),
      ts.createPropertyAssignment("proxy", proxy),
      ts.createPropertyAssignment("extraLib", ts.createStringLiteral(printer.printFile(sourceFile))),
    ]);
  }

  private code(protoMethod: MethodDescriptorProto, protoService: ServiceDescriptorProto, printer: ts.Printer): string {
    const statements = [
      ts.createExpressionStatement(
        ts.createCall(ts.createPropertyAccess(ts.createIdentifier(protoService.name!), ts.createIdentifier(protoMethod.name!)), undefined, [])
      ),
    ];

    let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

    sourceFile = ts.updateSourceFileNode(sourceFile, statements);

    return printer.printFile(sourceFile);
  }

  private proxy(protoService: ServiceDescriptorProto, interpreter: Interpreter, registry: DescriptorRegistry): ts.ObjectLiteralExpression {
    const methods = [];

    for (let protoMethod of protoService.method) {
      if (!protoMethod.name) {
        continue;
      }

      let mt = interpreter.getMessageType(protoMethod.inputType!);
      // registry.resolveTypeName

      const method = ts.createPropertyAssignment(
        protoMethod.name,
        ts.createArrowFunction(
          [ts.createModifier(ts.SyntaxKind.AsyncKeyword)],
          undefined,
          [
            /*ts.createParameter(
              undefined,
              undefined,
              undefined,
              "input",
              undefined
              ts.createTypeReferenceNode(ts.createIdentifier(registry.resolveTypeName(mt.typeName).name!), undefined)
            ),*/
          ],
          undefined,
          ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          this.proxyBody(protoService, protoMethod)
        )
      );

      methods.push(method);
    }

    const service = ts.createObjectLiteral(methods);

    return service;
  }

  private proxyBody(protoService: ServiceDescriptorProto, protoMethod: MethodDescriptorProto): ts.Block {
    const transport = ts.createVariableDeclaration(
      "transport",
      undefined,
      ts.createNew(ts.createIdentifier("TwirpFetchTransport"), undefined, [
        ts.createObjectLiteral([ts.createPropertyAssignment("baseUrl", ts.createStringLiteral("http://localhost:3000/twirp"))]),
      ])
    );

    const client = ts.createVariableDeclaration(
      "client",
      undefined,
      ts.createNew(ts.createIdentifier(protoService.name + "Client"), undefined, [ts.createIdentifier("transport")])
    );

    const firstLetter = protoMethod.name!.charAt(0).toLowerCase();
    const outputString = firstLetter + protoMethod.name!.slice(1);

    const response = ts.createVariableDeclaration(
      "{ response }",
      undefined,

      ts.createAwait(
        ts.createCall(ts.createPropertyAccess(ts.createIdentifier("client"), ts.createIdentifier(outputString)), undefined, [
          ts.createAsExpression(ts.createObjectLiteral([]), ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)),
        ])
      )
    );

    return ts.createBlock([
      ts.createVariableStatement(undefined, ts.createVariableDeclarationList([transport])),
      ts.createVariableStatement(undefined, ts.createVariableDeclarationList([client])),
      ts.createVariableStatement(undefined, ts.createVariableDeclarationList([response])),
      ts.createExpressionStatement(ts.createCall(ts.createIdentifier("(window as any).GOUT"), undefined, [ts.createIdentifier("response")])),
      ts.createReturn(ts.createIdentifier("response")),
    ]);
  }

  private extraLibs(registry: DescriptorRegistry, printer: ts.Printer): ts.ArrayLiteralExpression {
    const symbols = new SymbolTable(),
      imports = new TypeScriptImports(symbols),
      comments = new CommentGenerator(registry),
      options = makeInternalOptions(),
      interpreter = new Interpreter(registry, options);

    const genClientGeneric = new ServiceClientGeneratorGeneric(symbols, registry, imports, comments, interpreter, options);
    const extraLibs = [];

    for (let fileDescriptor of registry.allFiles()) {
      const file = new TypescriptFile(fileDescriptor.name + ".proto.ts");
      const statements: ts.InterfaceDeclaration[] = [];

      registry.visitTypes(fileDescriptor, (descriptor) => {
        // we are not interested in synthetic types like map entry messages
        if (registry.isSyntheticElement(descriptor)) return;

        // register all symbols, regardless whether they are going to be used - we want stable behaviour
        symbols.register(createLocalTypeName(descriptor, registry), descriptor, file);
        if (ServiceDescriptorProto.is(descriptor)) {
          genClientGeneric.registerSymbols(file, descriptor);
        }
      });

      registry.visitTypes(fileDescriptor, (descriptor) => {
        if (ServiceDescriptorProto.is(descriptor) && descriptor.name) {
          statements.push(genClientGeneric.generateInterface(file, descriptor));
        }
      });

      let sourceFile = ts.createSourceFile("new-file.ts", "", ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
      sourceFile = ts.updateSourceFileNode(sourceFile, statements);

      extraLibs.push(
        ts.createObjectLiteral([
          ts.createPropertyAssignment("filePath", ts.createStringLiteral(fileDescriptor.name + ".proto.ts")),
          ts.createPropertyAssignment("content", ts.createStringLiteral(printer.printFile(sourceFile))),
        ])
      );
    }

    return ts.createArrayLiteral(extraLibs);
  }
}
