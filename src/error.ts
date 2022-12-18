/**
 * @public
 */
export class ExpressionError extends Error {
  constructor(message: string, public range: [number, number]) {
    super(message)
  }
}
