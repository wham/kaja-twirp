import ts from "typescript";
import { InterfaceMap } from "./project";

export function defaultInput(input: ts.ParameterDeclaration, sourceFile: ts.SourceFile, interfaceMap: InterfaceMap): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  const type = input.type;
  const typeName = type?.getText(sourceFile);

  if (!typeName || !interfaceMap[typeName]) {
    return ts.factory.createObjectLiteralExpression([]);
  }

  const interfaceDeclaration = interfaceMap[typeName];

  return defaultInterfaceImplementation([interfaceDeclaration.interfaceDeclaration, interfaceDeclaration.sourceFile]);
}

export function defaultInterfaceImplementation(interfaceDeclaration: [ts.InterfaceDeclaration, ts.SourceFile]): ts.ObjectLiteralExpression {
  const properties: ts.PropertyAssignment[] = [];

  interfaceDeclaration[0].members.forEach((member) => {
    if (ts.isPropertySignature(member) && member.name && member.type) {
      properties.push(ts.factory.createPropertyAssignment(member.name.getText(interfaceDeclaration[1]), defaultValue(member.type, interfaceDeclaration[1])));
    }
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultValue(type: ts.TypeNode, sourceFile: ts.SourceFile): ts.Expression {
  if (type.kind === ts.SyntaxKind.StringKeyword) {
    return ts.factory.createStringLiteral("");
  }

  if (type.kind === ts.SyntaxKind.BooleanKeyword) {
    return ts.factory.createTrue();
  }

  if (type.kind === ts.SyntaxKind.NumberKeyword) {
    return ts.factory.createNumericLiteral("0");
  }

  if (type.kind === ts.SyntaxKind.ArrayType) {
    const arrayType = type as ts.ArrayTypeNode;
    return ts.factory.createArrayLiteralExpression([defaultValue(arrayType.elementType, sourceFile)]);
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
        properties.push(ts.factory.createPropertyAssignment(defaultKeyValue(keyType), defaultValue(member.type, sourceFile)));
      }
    });
    return ts.factory.createObjectLiteralExpression(properties);
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

  return ts.factory.createStringLiteral("?");
}
