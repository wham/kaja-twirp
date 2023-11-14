import { FieldInfo, IMessageType, ScalarType } from "@protobuf-ts/runtime";
import ts from "typescript";

export function defaultInput<T extends object>(I: IMessageType<T>): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  I.fields.forEach((field) => {
    properties.push(ts.factory.createPropertyAssignment(field.localName, defaultValue(field)));
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultValue(field: FieldInfo): ts.Expression {
  if (field.kind === "scalar") {
    return defaultScalar(field.T);
  }

  if (field.kind === "map") {
    const properties: ts.PropertyAssignment[] = [];
    properties.push(ts.factory.createPropertyAssignment(defaultMapKey(field.K), ts.factory.createTrue()));

    return ts.factory.createObjectLiteralExpression(properties);
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

function defaultScalar(value: ScalarType): ts.TrueLiteral | ts.NumericLiteral | ts.StringLiteral {
  switch (value) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.INT32:
    case ScalarType.FIXED64:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SFIXED64:
    case ScalarType.SINT32:
    case ScalarType.SINT64:
      return ts.factory.createNumericLiteral(0);
    case ScalarType.BOOL:
      return ts.factory.createTrue();
  }

  return ts.factory.createStringLiteral("");
}

type MapKeyType = Exclude<ScalarType, ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES>;

function defaultMapKey(key: MapKeyType): string {
  switch (key) {
    case ScalarType.INT64:
    case ScalarType.UINT64:
    case ScalarType.INT32:
    case ScalarType.FIXED64:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SFIXED64:
    case ScalarType.SINT32:
    case ScalarType.SINT64:
      return "0";
    case ScalarType.BOOL:
      return "true";
  }

  return "key";
}
