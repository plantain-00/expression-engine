/**
 * @public
 */
export type Token =
  | BooleanLiteral
  | EOFToken
  | Identifier
  | KeywordToken
  | NumericLiteral
  | PunctuatorToken
  | StringLiteral
  | NullLiteral

/**
 * @public
 */
export interface EOFToken extends Node {
  type: 'EOFToken'
}

/**
 * @public
 */
export interface KeywordToken extends Node {
  type: 'KeywordToken'
  name: string
}

/**
 * @public
 */
export interface Node {
  range: [number, number]
}

/**
 * @public
 */
export interface PunctuatorToken extends Node {
  type: 'PunctuatorToken'
  value: string
}

/**
 * @public
 */
export type Expression =
  | BinaryExpression
  | MemberExpression
  | Identifier
  | NumericLiteral
  | StringLiteral
  | ConditionalExpression
  | CallExpression
  | LogicalExpression
  | UnaryExpression
  | ThisExpression
  | BooleanLiteral
  | ArrayExpression
  | ObjectExpression
  | NullLiteral
  | ArrowFunctionExpression
  | FunctionParamsExpression

/**
 * @public
 */
export interface NumericLiteral extends Node {
  type: 'NumericLiteral'
  value: number
}

/**
 * @public
 */
export interface NullLiteral extends Node {
  type: 'NullLiteral'
}

/**
 * @public
 */
export interface ArrayExpression extends Node {
  type: 'ArrayExpression'
  elements: (Expression | SpreadElement)[]
}

/**
 * @public
 */
export interface ObjectExpression extends Node {
  type: 'ObjectExpression'
  properties: (Property | SpreadElement)[]
}

/**
 * @public
 */
export interface Property extends Node {
  type: 'Property'
  key: NumericLiteral | StringLiteral | Identifier
  value: Expression
  shorthand: boolean
}

/**
 * @public
 */
export interface LogicalExpression extends Node {
  type: 'LogicalExpression'
  operator: LogicalOperator
  left: Expression
  right: Expression
}

/**
 * @public
 */
export type LogicalOperator = '||' | '&&' | '??'

/**
 * @public
 */
export interface CallExpression extends Node {
  type: 'CallExpression'
  callee: Expression
  arguments: (Expression | SpreadElement)[]
  optional?: boolean
}

/**
 * @public
 */
export interface SpreadElement extends Node {
  type: 'SpreadElement'
  argument: Expression
}

/**
 * @public
 */
export interface ConditionalExpression extends Node {
  type: 'ConditionalExpression'
  test: Expression
  consequent: Expression
  alternate: Expression
}

/**
 * @public
 */
export interface StringLiteral extends Node {
  type: 'StringLiteral'
  value: string
}

/**
 * @public
 */
export interface BooleanLiteral extends Node {
  type: 'BooleanLiteral'
  value: boolean
}

/**
 * @public
 */
export interface Identifier extends Node {
  type: 'Identifier'
  name: string
}

/**
 * @public
 */
export interface ThisExpression extends Node {
  type: 'ThisExpression'
}

/**
 * @public
 */
export interface MemberExpression extends Node {
  type: 'MemberExpression'
  object: Expression
  property: Expression
  optional?: boolean
}

/**
 * @public
 */
export interface UnaryExpression extends Node {
  type: 'UnaryExpression'
  operator: UnaryOperator
  argument: Expression
}

/**
 * @public
 */
export type UnaryOperator = '+' | '-' | '!' | '~' | '%' | 'await'

/**
 * @public
 */
export interface BinaryExpression extends Node {
  type: 'BinaryExpression'
  operator: BinaryOperator
  left: Expression
  right: Expression
}

/**
 * @public
 */
export interface ArrowFunctionExpression extends Node {
  type: 'ArrowFunctionExpression'
  params: Pattern[]
  body: Expression
}

/**
 * @public
 */
export type Pattern = Identifier | AssignmentPattern | RestElement

/**
 * @public
 */
export interface AssignmentPattern extends Node {
  type: 'AssignmentPattern'
  left: Identifier
  right: Expression
}

/**
 * @public
 */
export interface RestElement extends Node {
  type: 'RestElement'
  argument: Identifier
}

/**
 * @public
 */
export interface FunctionParamsExpression extends Node {
  type: 'FunctionParamsExpression'
  params: Pattern[]
}

/**
 * @public
 */
export type BinaryOperator =
  | '**'
  | '*' | '/' | '%'
  | '+' | '-'
  | '<<' | '>>' | '>>>'
  | '>' | '<' | '>=' | '<='
  | '==' | '!=' | '===' | '!=='
  | '&'
  | '^'
  | '|'
  | '|>'
