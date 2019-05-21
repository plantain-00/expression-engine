/**
 * @public
 */
export type Token = BooleanLiteral | EOFToken | Identifier | KeywordToken | NumericLiteral | PunctuatorToken | StringLiteral

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
export interface LogicalExpression extends Node {
  type: 'LogicalExpression'
  operator: LogicalOperator
  left: Expression
  right: Expression
}

/**
 * @public
 */
export type LogicalOperator = '||' | '&&'

/**
 * @public
 */
export interface CallExpression extends Node {
  type: 'CallExpression'
  callee: Expression
  arguments: Expression[]
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
export type UnaryOperator = '+' | '-' | '!' | '~' | '%'

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
export type BinaryOperator = '+' | '-' | '*' | '/' | '%' | '>' | '<' | '>=' | '<=' | '==' | '!=' | '&&' | '||' | '===' | '!=='
