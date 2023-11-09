import { FieldInfo, ScalarType } from "@protobuf-ts/runtime";
import { MethodInfo } from "@protobuf-ts/runtime-rpc";
import ts from "typescript";

export function defaultInput2(methodInfo: MethodInfo): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  methodInfo.I.fields.forEach((field) => {
    properties.push(ts.factory.createPropertyAssignment(field.localName, defaultValue(field)));
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultValue(field: FieldInfo): ts.Expression {
  if (field.kind === "scalar" && field.T === ScalarType.STRING) {
    return ts.factory.createStringLiteral("");
  }

  if (field.kind === "scalar" && field.T === ScalarType.BOOL) {
    return ts.factory.createTrue();
  }

  const numericTypes = [
    ScalarType.DOUBLE,
    ScalarType.FLOAT,
    ScalarType.INT64,
    ScalarType.UINT64,
    ScalarType.INT32,
    ScalarType.FIXED64,
    ScalarType.FIXED32,
    ScalarType.UINT32,
    ScalarType.SFIXED32,
    ScalarType.SFIXED64,
    ScalarType.SINT32,
    ScalarType.SINT64,
  ];

  if (field.kind === "scalar" && numericTypes.includes(field.T)) {
    return ts.factory.createNumericLiteral("0");
  }

  /*if (type.kind === ts.SyntaxKind.BigIntKeyword) {
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
  }*/

  return ts.factory.createNull();
}
