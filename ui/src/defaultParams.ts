import ts from "typescript";

export function defaultParam(
  ip: ts.ParameterDeclaration,
  sourceFile: ts.SourceFile,
  allInterfaces: { [key: string]: ts.InterfaceDeclaration }
): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  const type = ip.type;

  if (!type || !allInterfaces[type.getText(sourceFile)]) {
    return ts.factory.createObjectLiteralExpression([]);
  }

  return interfaceDefaultImplementation(
    allInterfaces[type.getText(sourceFile)],
    sourceFile
  );
}

export function interfaceDefaultImplementation(
  interfaceDeclaration: ts.InterfaceDeclaration,
  sourceFile: ts.SourceFile
): ts.ObjectLiteralExpression {
  const properties: ts.PropertyAssignment[] = [];

  interfaceDeclaration.members.forEach((member) => {
    if (ts.isPropertySignature(member) && member.name && member.type) {
      properties.push(
        ts.factory.createPropertyAssignment(
          member.name.getText(sourceFile),
          defaultValue(member.type)
        )
      );
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

  return ts.factory.createNull();
}
