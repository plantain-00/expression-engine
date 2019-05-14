/**
 * @public
 */
export type Token = BooleanLiteral | EOFToken | Identifier | KeywordToken | NumericLiteral | PunctuatorToken | StringLiteral

/**
 * @public
 */
export interface EOFToken {
  type: 'EOFToken'
}

/**
 * @public
 */
export interface KeywordToken {
  type: 'KeywordToken'
  name: string
}

/**
 * @public
 */
export interface PunctuatorToken {
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
export interface NumericLiteral {
  type: 'NumericLiteral'
  value: number
}

/**
 * @public
 */
export interface LogicalExpression {
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
export interface CallExpression {
  type: 'CallExpression'
  callee: Expression
  arguments: Expression[]
}

/**
 * @public
 */
export interface ConditionalExpression {
  type: 'ConditionalExpression'
  test: Expression
  consequent: Expression
  alternate: Expression
}

/**
 * @public
 */
export interface StringLiteral {
  type: 'StringLiteral'
  value: string
}

/**
 * @public
 */
export interface BooleanLiteral {
  type: 'BooleanLiteral'
  value: boolean
}

/**
 * @public
 */
export interface Identifier {
  type: 'Identifier'
  name: string
}

/**
 * @public
 */
export interface ThisExpression {
  type: 'ThisExpression'
}

/**
 * @public
 */
export interface MemberExpression {
  type: 'MemberExpression'
  object: Expression
  property: Expression
}

/**
 * @public
 */
export interface UnaryExpression {
  type: 'UnaryExpression'
  operator: UnaryOperator
  argument: Expression
}

/**
 * @public
 */
export type UnaryOperator = '+' | '-'

/**
 * @public
 */
export interface BinaryExpression {
  type: 'BinaryExpression'
  operator: BinaryOperator
  left: Expression
  right: Expression
}

/**
 * @public
 */
export type BinaryOperator = '+' | '-' | '*' | '/' | '>' | '<' | '>=' | '<=' | '==' | '!=' | '&&' | '||'
