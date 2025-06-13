import { HttpExceptionsFilter } from '#main/http-exceptions.filter'
import { AppModule } from '#main/modules/app.module.js'
import { ValidationPipe } from '#main/validation.pipe.js'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-magic-numbers
const port = process.env.PORT || 3000

function isDevMode(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapter))
  app.useGlobalPipes(new ValidationPipe())

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
        .addTag('property', 'Endpoints de gerenciamento de propriedades')
        .addTag('safra', 'Endpoints de gerenciamento de safras')
        .addTag('plantation', 'Endpoints de gerenciamento de plantações')
        .setVersion('1.0')
        .build()
    )
    SwaggerModule.setup('docs', app, document)

    const docsFolder = path.resolve('docs')

    if (!existsSync(docsFolder)) {
      mkdirSync(docsFolder)
    }
    writeFileSync(
      path.resolve(docsFolder, 'openapi-spec.json'),
      JSON.stringify(document)
    )
  }

  await app.listen(port)

  process.stdout.write(`🚀 Server is running on: http://localhost:${port}\n`)
  process.stdout.write(
    `📚 Swagger is running on http://localhost:${port}/docs\n`
  )
}

bootstrap().catch(console.error)
