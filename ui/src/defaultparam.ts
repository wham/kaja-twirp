import ts from "typescript";

export function defaultParam(
  ip: ts.ParameterDeclaration,
  sourceFile: ts.SourceFile
): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  const type = ip.type;

  if (!type || !ts.isInterfaceDeclaration(type)) {
    return ts.factory.createObjectLiteralExpression([]);
  }

  const name = type.getText(sourceFile);

  type.forEachChild((child) => {
    const childName = child.getText(sourceFile);
    const kind = child.kind;
    console.log(name, child.getText(sourceFile), child.kind);
  });

  return ts.factory.createObjectLiteralExpression([]);
}

export function interfaceDefaultImplementation(
  interfaceDeclaration: ts.InterfaceDeclaration
): ts.ObjectLiteralExpression {
  return ts.factory.createObjectLiteralExpression([]);
}
