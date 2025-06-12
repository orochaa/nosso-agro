import { AppModule } from '#main/modules/app.module.js'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import type { ValidationError } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-magic-numbers
const port = process.env.PORT || 3000

function isDevMode(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

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

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
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
  )

  if (isDevMode()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Nosso Agro API')
        .setDescription(
          'API para gerenciamento de produtores rurais e suas safras'
        )
        .addTag('producer', 'Endpoints de gerenciamento de produtores')
        .addTag('farm', 'Endpoints de gerenciamento de propriedades')
        .addTag('safra', 'Endpoints de gerenciamento de safras')
        .addTag('plantation', 'Endpoints de gerenciamento de safras')
        .setVersion('1.0')
        .build()
    )
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(port)

  process.stdout.write(`🚀 Server is running on: http://localhost:${port}\n`)
  process.stdout.write(
    `📚 Swagger is running on http://localhost:${port}/docs\n`
  )
}

bootstrap().catch(console.error)
