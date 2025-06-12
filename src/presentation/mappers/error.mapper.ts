import { ApiProperty } from '@nestjs/swagger'

export class HttpExceptionError extends Error {
  @ApiProperty({ oneOf: [{ type: 'string' }, { type: 'string[]' }] })
  message: string
  @ApiProperty()
  error: string
  @ApiProperty({ minimum: 200, maximum: 500 })
  statusCode: number

  constructor(message: string, error?: string, statusCode?: number) {
    super(message, { cause: error ?? 'BadRequest' })

    this.name = 'HttpExceptionError'
    this.error = error ?? 'BadRequest'
    this.statusCode = statusCode ?? 400
  }
}
