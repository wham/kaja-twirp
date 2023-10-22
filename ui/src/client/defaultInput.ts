import ts from "typescript";

export function defaultInput(
  input: ts.ParameterDeclaration,
  sourceFile: ts.SourceFile,
  allInterfaces: { [key: string]: [ts.InterfaceDeclaration, ts.SourceFile] },
): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  const type = input.type;
  const typeName = type?.getText(sourceFile);

  if (!typeName || !allInterfaces[typeName]) {
    return ts.factory.createObjectLiteralExpression([]);
  }

  const interfaceDeclaration = allInterfaces[typeName];

  return defaultInterfaceImplementation(interfaceDeclaration);
}

export function defaultInterfaceImplementation(interfaceDeclaration: [ts.InterfaceDeclaration, ts.SourceFile]): ts.ObjectLiteralExpression {
  const properties: ts.PropertyAssignment[] = [];

  interfaceDeclaration[0].members.forEach((member) => {
    if (ts.isPropertySignature(member) && member.name && member.type) {
      properties.push(ts.factory.createPropertyAssignment(member.name.getText(interfaceDeclaration[1]), defaultValue(member.type)));
    }
  });

  return ts.factory.createObjectLiteralExpression(properties);
}

function defaultValue(type: ts.TypeNode): ts.Expression {
  if (type.kind === ts.SyntaxKind.StringKeyword) {
    return ts.factory.createStringLiteral("");
  }

  if (type.kind === ts.SyntaxKind.BooleanKeyword) {
    return ts.factory.createTrue();
  }

  if (type.kind === ts.SyntaxKind.NumberKeyword) {
    return ts.factory.createNumericLiteral("0");
  }

  return ts.factory.createNull();
}
