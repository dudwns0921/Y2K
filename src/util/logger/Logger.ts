const IS_DEV = import.meta.env.DEV

class Logger {
  private nameSpace: string
  private prefix: string

  constructor(nameSpace: string) {
    this.nameSpace = nameSpace
    this.prefix = ''
  }

  getPrefix(): string {
    return this.prefix
  }

  setPrefix(detail: string): void {
    this.prefix = `(Y2K_Project:${this.nameSpace})${
      detail ? `[${detail}]` : ''
    } >`
  }

  log(...message: any): void {
    if (IS_DEV) {
      console.log(this.getPrefix(), ...message)
    }
  }

  error(...message: any): void {
    if (IS_DEV) {
      console.error(this.getPrefix(), ...message)
    }
  }
}

export default Logger
