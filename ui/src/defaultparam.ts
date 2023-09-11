import ts from "typescript";

export function defaultParam(
  ip: ts.ParameterDeclaration
): ts.ObjectLiteralExpression {
  let properties: ts.PropertyAssignment[] = [];

  /*.forEach((prop) => {

  });*/

  return ts.factory.createObjectLiteralExpression([]);
}
