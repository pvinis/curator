declare module "pushsafer-notifications" {
  interface PushsaferOptions {
    k?: string
  }

  interface Message {
    t?: string
    m?: string
    u?: string
    [key: string]: string | undefined
  }

  class Pushsafer {
    constructor(options: PushsaferOptions)
    send(message: Message): void
  }

  export = Pushsafer
}
