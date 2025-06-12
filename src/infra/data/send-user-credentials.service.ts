import { IMailer } from '#services/protocols/data/mailer.js'
import type { ISendUserCredentials } from '#services/protocols/data/mailer.js'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SendUserCredentials implements ISendUserCredentials {
  constructor(readonly mailer: IMailer) {}

  async sendMail(params: ISendUserCredentials.Params): Promise<void> {
    await this.mailer.sendMail({
      to: params.email,
      subject: 'Conta criada',
      content: `
        Olá ${params.firstName}, sua conta foi criada com sucesso.
        Seu login é: ${params.email}
        Sua senha é: ${params.password}
      `.trim(),
    })
  }
}
