import axios, { CancelTokenSource } from 'axios'

class RegisterCancelTokenAxios {
  sources: Record<string, CancelTokenSource[]> = {}

  register(name: string) {
    const source = axios.CancelToken.source()
    this.add(source, name)
    return source
  }

  add(source: any, name: string) {
    if (this.sources[name]) {
      this.sources[name].push(source)
    } else {
      this.sources[name] = [source]
    }
  }

  delete(name: string) {
    if (this.sources[name]) {
      this.sources[name].forEach((source) => {
        source.cancel()
      })
      delete this.sources[name]
    }
  }
}

const registerCancelTokenAxios = new RegisterCancelTokenAxios()
export default registerCancelTokenAxios
