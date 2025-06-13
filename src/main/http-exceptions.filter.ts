/* eslint-disable promise/valid-params */
import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

@Catch(HttpException)
export class HttpExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionsFilter.name)

  catch(exception: HttpException, host: ArgumentsHost): void {
    const status = exception.getStatus()

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (status >= 500) {
      this.logger.error(exception.message, exception.stack)
    }

    super.catch(exception, host)
  }
}
