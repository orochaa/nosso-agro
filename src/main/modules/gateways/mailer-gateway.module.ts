import {
  IMailer,
  ISendUserCredentials,
} from '#services/protocols/data/mailer.js'
import { MailerAdapter } from '#infra/adapters/mailer.adapter.js'
import { SendUserCredentials } from '#infra/data/send-user-credentials.service.js'
import { Module } from '@nestjs/common'

@Module({
  providers: [
    {
      provide: IMailer,
      useClass: MailerAdapter,
    },
    {
      provide: ISendUserCredentials,
      useClass: SendUserCredentials,
    },
  ],
  exports: [ISendUserCredentials],
})
export class MailerGatewayModule {}
