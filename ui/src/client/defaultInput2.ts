import { MethodInfo } from "@protobuf-ts/runtime-rpc";
import ts from "typescript";
import { InterfaceMap } from "./project";

export function defaultInput2(methodInfo: MethodInfo): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  properties.push(ts.factory.createPropertyAssignment("test", ts.factory.createStringLiteral(methodInfo.I.toJsonString(methodInfo.I.create()))));

  return ts.factory.createObjectLiteralExpression(properties);
}

export function defaultInterfaceImplementation(
  interfaceDeclaration: [ts.InterfaceDeclaration, ts.SourceFile],
  interfaceMap: InterfaceMap,
): ts.ObjectLiteralExpression {
  const properties: ts.PropertyAssignment[] = [];

  interfaceDeclaration[0].members.forEach((member) => {
    if (ts.isPropertySignature(member) && member.name && member.type) {
      properties.push(
        ts.factory.createPropertyAssignment(member.name.getText(interfaceDeclaration[1]), defaultValue(member.type, interfaceDeclaration[1], interfaceMap)),
      );
    }
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultValue(type: ts.TypeNode, sourceFile: ts.SourceFile, interfaceMap: InterfaceMap): ts.Expression {
  if (type.kind === ts.SyntaxKind.StringKeyword) {
    return ts.factory.createStringLiteral("");
  }

  if (type.kind === ts.SyntaxKind.BooleanKeyword) {
    return ts.factory.createTrue();
  }

  if (type.kind === ts.SyntaxKind.NumberKeyword) {
    return ts.factory.createNumericLiteral("0");
  }

  if (type.kind === ts.SyntaxKind.BigIntKeyword) {
    return ts.factory.createNumericLiteral(0);
  }

  if (type.kind === ts.SyntaxKind.ArrayType) {
    const arrayType = type as ts.ArrayTypeNode;
    return ts.factory.createArrayLiteralExpression([defaultValue(arrayType.elementType, sourceFile, interfaceMap)]);
  }

  if (type.kind === ts.SyntaxKind.TypeLiteral) {
    const typeLiteral = type as ts.TypeLiteralNode;
    const properties: ts.PropertyAssignment[] = [];
    typeLiteral.members.forEach((member) => {
      //if (ts.is(member) && member.type) {
      //properties.push(ts.factory.createPropertyAssignment("key", defaultValue(member.type, sourceFile)));
      //}
      if (ts.isIndexSignatureDeclaration(member) && member.parameters[0].type) {
        const keyType = member.parameters[0].type;
        properties.push(ts.factory.createPropertyAssignment(defaultKeyValue(keyType), defaultValue(member.type, sourceFile, interfaceMap)));
      }
    });
    return ts.factory.createObjectLiteralExpression(properties);
  }

  if (type.kind === ts.SyntaxKind.TypeReference) {
    const typeReference = type as ts.TypeReferenceNode;
    const typeName = typeReference.typeName.getText(sourceFile);
    if (interfaceMap[typeName]) {
      return defaultInterfaceImplementation([interfaceMap[typeName].interfaceDeclaration, interfaceMap[typeName].sourceFile], interfaceMap);
    }
  }

  return ts.factory.createNull();
}

function defaultKeyValue(type: ts.TypeNode): ts.PropertyName {
  if (type.kind === ts.SyntaxKind.StringKeyword) {
    return ts.factory.createStringLiteral("");
  }

  if (type.kind === ts.SyntaxKind.NumberKeyword) {
    return ts.factory.createNumericLiteral(0);
  }

  if (type.kind === ts.SyntaxKind.BigIntKeyword) {
    return ts.factory.createNumericLiteral(0);
  }

  return ts.factory.createStringLiteral("?");
}
