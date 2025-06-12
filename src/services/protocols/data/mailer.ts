export abstract class IMailer {
  abstract sendMail(params: IMailer.Params): Promise<void>
}

export namespace IMailer {
  export interface Params {
    to: string | string[]
    subject: string
    content: string
  }
}

export abstract class ISendUserCredentials {
  abstract sendMail(params: ISendUserCredentials.Params): Promise<void>
}

export namespace ISendUserCredentials {
  export interface Params {
    firstName: string
    email: string
    password: string
  }
}
