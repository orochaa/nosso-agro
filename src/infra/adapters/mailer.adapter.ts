import type { IMailer } from '#services/protocols/data/mailer.js'
import { Injectable, Logger } from '@nestjs/common'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

@Injectable()
export class MailerAdapter implements IMailer {
  readonly client: SESClient
  readonly logger: Logger

  constructor() {
    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM is not defined')
    }
    this.client = new SESClient({ region: 'us-east-1' })
    this.logger = new Logger(MailerAdapter.name)
  }

  async sendMail(params: IMailer.Params): Promise<void> {
    try {
      await this.client.send(
        new SendEmailCommand({
          Source: process.env.EMAIL_FROM,
          Destination: {
            ToAddresses: Array.isArray(params.to) ? params.to : [params.to],
          },
          Message: {
            Subject: { Data: params.subject },
            Body: { Html: { Data: params.content } },
          },
        })
      )
    } catch (error) {
      this.logger.error(error)
    }
  }
}
