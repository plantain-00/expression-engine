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
  parenthesesRange?: [number, number]
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
export type Expression2 =
  | BinaryExpression2
  | MemberExpression2
  | Identifier2
  | NumericLiteral2
  | StringLiteral2
  | ConditionalExpression2
  | CallExpression2
  | LogicalExpression2
  | UnaryExpression2
  | ThisExpression2
  | BooleanLiteral2
  | ArrayExpression2
  | ObjectExpression2
  | NullLiteral2
  | ArrowFunctionExpression2
  | FunctionParamsExpression2

/**
 * @public
 */
export type NumericLiteral = Node & NumericLiteral2

/**
 * @public
 */
export interface NumericLiteral2 {
  type: 'NumericLiteral'
  value: number
}

/**
 * @public
 */
export type NullLiteral = Node & NullLiteral2

/**
 * @public
 */
export interface NullLiteral2 {
  type: 'NullLiteral'
}

/**
 * @public
 */
export type ArrayExpression = Node & ArrayExpression2<Expression | SpreadElement>

/**
 * @public
 */
export interface ArrayExpression2<T = Expression2 | SpreadElement2> {
  type: 'ArrayExpression'
  elements: T[]
}

/**
 * @public
 */
export type ObjectExpression = Node & ObjectExpression2<Property | SpreadElement>

/**
 * @public
 */
export interface ObjectExpression2<T = Property2 | SpreadElement2> {
  type: 'ObjectExpression'
  properties: T[]
}

/**
 * @public
 */
export type Property = Node & Property2<NumericLiteral | StringLiteral | Identifier>

/**
 * @public
 */
export interface Property2<T = NumericLiteral2 | StringLiteral2 | Identifier2> {
  type: 'Property'
  key: T
  value: Expression
  shorthand: boolean
}

/**
 * @public
 */
export type LogicalExpression = Node & LogicalExpression2<Expression>

/**
 * @public
 */
export interface LogicalExpression2<T = Expression2> {
  type: 'LogicalExpression'
  operator: LogicalOperator
  left: T
  right: T
}

/**
 * @public
 */
export type LogicalOperator = '||' | '&&' | '??'

/**
 * @public
 */
export type CallExpression = Node & CallExpression2<Expression | SpreadElement, Expression>

/**
 * @public
 */
export interface CallExpression2<T = Expression2 | SpreadElement2, T2 = Expression2> {
  type: 'CallExpression'
  callee: T2
  arguments: T[]
  optional?: boolean
}

/**
 * @public
 */
export type SpreadElement = Node & SpreadElement2<Expression>

/**
 * @public
 */
export interface SpreadElement2<T = Expression> {
  type: 'SpreadElement'
  argument: T
}

/**
 * @public
 */
export type ConditionalExpression = Node & ConditionalExpression2<Expression>

/**
 * @public
 */
export interface ConditionalExpression2<T = Expression2> {
  type: 'ConditionalExpression'
  test: T
  consequent: T
  alternate: T
}

/**
 * @public
 */
export type StringLiteral = Node & StringLiteral2

/**
 * @public
 */
export interface StringLiteral2 {
  type: 'StringLiteral'
  value: string
}

/**
 * @public
 */
export type BooleanLiteral = Node & BooleanLiteral2

/**
 * @public
 */
export interface BooleanLiteral2 {
  type: 'BooleanLiteral'
  value: boolean
}

/**
 * @public
 */
export type Identifier = Node & Identifier2

/**
 * @public
 */
export interface Identifier2 {
  type: 'Identifier'
  name: string
}

/**
 * @public
 */
export type ThisExpression = Node & ThisExpression2

/**
 * @public
 */
export interface ThisExpression2 {
  type: 'ThisExpression'
}

/**
 * @public
 */
export type MemberExpression = Node & MemberExpression2<Expression>

/**
 * @public
 */
export interface MemberExpression2<T = Expression2> {
  type: 'MemberExpression'
  object: T
  property: T
  optional?: boolean
}

/**
 * @public
 */
export type UnaryExpression = Node & UnaryExpression2<Expression>

/**
 * @public
 */
export interface UnaryExpression2<T = Expression2> {
  type: 'UnaryExpression'
  operator: UnaryOperator
  argument: T
}

/**
 * @public
 */
export type UnaryOperator = '+' | '-' | '!' | '~' | '%' | 'await'

/**
 * @public
 */
export type BinaryExpression = Node & BinaryExpression2<Expression>

/**
 * @public
 */
export interface BinaryExpression2<T = Expression2> {
  type: 'BinaryExpression'
  operator: BinaryOperator
  left: T
  right: T
}

/**
 * @public
 */
export type ArrowFunctionExpression = Node & ArrowFunctionExpression2<Pattern, Expression>

/**
 * @public
 */
export interface ArrowFunctionExpression2<T = Pattern2, T2 = Expression2> {
  type: 'ArrowFunctionExpression'
  params: T[]
  body: T2
}

/**
 * @public
 */
export type Pattern = Identifier | AssignmentPattern | RestElement

/**
 * @public
 */
export type Pattern2 = Identifier2 | AssignmentPattern2 | RestElement2

/**
 * @public
 */
export type AssignmentPattern = Node & AssignmentPattern2<Identifier, Expression>

/**
 * @public
 */
export interface AssignmentPattern2<T = Identifier2, T2 = Expression> {
  type: 'AssignmentPattern'
  left: T
  right: T2
}

/**
 * @public
 */
export type RestElement = Node & RestElement2<Identifier>

/**
 * @public
 */
export interface RestElement2<T = Identifier2> {
  type: 'RestElement'
  argument: T
}

/**
 * @public
 */
export type FunctionParamsExpression = Node & FunctionParamsExpression2<Pattern>

/**
 * @public
 */
export interface FunctionParamsExpression2<T = Pattern2> {
  type: 'FunctionParamsExpression'
  params: T[]
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
