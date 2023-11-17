import { EnumInfo, FieldInfo, IMessageType, LongType, ScalarType } from "@protobuf-ts/runtime";
import ts from "typescript";

export function defaultMessage<T extends object>(message: IMessageType<T>): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  message.fields.forEach((field) => {
    const value = field.repeat ? ts.factory.createArrayLiteralExpression([defaultMessageField(field)]) : defaultMessageField(field);

    properties.push(ts.factory.createPropertyAssignment(field.localName, value));
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultMessageField(field: FieldInfo): ts.Expression {
  if (field.kind === "scalar") {
    return defaultScalar(field.T, field.L);
  }

  if (field.kind === "map") {
    const properties: ts.PropertyAssignment[] = [];
    properties.push(ts.factory.createPropertyAssignment(defaultMapKey(field.K), defaultMapValue(field.V)));

    return ts.factory.createObjectLiteralExpression(properties);
  }

  if (field.kind === "enum") {
    return defaultEnum(field.T());
  }

  if (field.kind === "message") {
    return defaultMessage(field.T());
  }

  return ts.factory.createNull();
}

function defaultScalar(value: ScalarType, long?: LongType): ts.TrueLiteral | ts.NumericLiteral | ts.StringLiteral | ts.BigIntLiteral {
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
      if (long === LongType.BIGINT) {
        return ts.factory.createBigIntLiteral("0n");
      }
      return ts.factory.createNumericLiteral(0);
    case ScalarType.BOOL:
      return ts.factory.createTrue();
  }

  return ts.factory.createStringLiteral("");
}

type mapKeyType = Exclude<ScalarType, ScalarType.FLOAT | ScalarType.DOUBLE | ScalarType.BYTES>;

function defaultMapKey(key: mapKeyType): string {
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

type mapValueType =
  | {
      kind: "scalar";
      T: ScalarType;
      L?: LongType;
    }
  | {
      kind: "enum";
      T: () => EnumInfo;
    }
  | {
      kind: "message";
      T: () => IMessageType<any>;
    };

function defaultMapValue(value: mapValueType): ts.Expression {
  switch (value.kind) {
    case "scalar":
      return defaultScalar(value.T, value.L);
    case "enum":
      return defaultEnum(value.T());
    case "message":
      return defaultMessage(value.T());
  }
}

function defaultEnum(value: EnumInfo): ts.Expression {
  let enumName = value[0];
  // Temp hack to quirks.v1.RepeatedRequest.Enum -> RepeatedRequest_Enum
  // Won't work with any real projects
  const nameParts = enumName.split(".");
  if (nameParts.length === 4) {
    enumName = nameParts[2] + "_" + nameParts[3];
  }

  return ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier(enumName), ts.factory.createIdentifier(value[1][0]));
}
