import {
  BadRequestException,
  ValidationPipe as _ValidationPipe,
} from '@nestjs/common'
import type { ValidationError } from '@nestjs/common'

function mapError(
  errorResponse: Record<string, unknown>,
  error: ValidationError
): void {
  if (error.children?.length) {
    errorResponse[error.property] ??= {}
    const nestedErrorResponse = errorResponse[error.property]

    for (const childError of error.children) {
      mapError(nestedErrorResponse as Record<string, unknown>, childError)
    }

    return
  }

  if (error.constraints) {
    errorResponse[error.property] = Object.values(error.constraints)[0]

    return
  }

  // eslint-disable-next-line no-console
  console.warn(`MapValidationError: ${JSON.stringify(error, null, 2)}`)
}

export class ValidationPipe extends _ValidationPipe {
  constructor() {
    super({
      always: true,
      stopAtFirstError: true,
      exceptionFactory(errors: ValidationError[]): never {
        const errorResponse: Record<string, unknown> = {}

        for (const error of errors) {
          mapError(errorResponse, error)
        }

        throw new BadRequestException({
          message: errorResponse,
          error: 'BadRequest',
          statusCode: 400,
        })
      },
    })
  }
}
