import {noop} from './noop'

export class Defer<T> {
  resolve: (value?: PromiseLike<T> | T) => void = noop
  reject: (reason?: unknown) => void = noop
  promise: Promise<T | undefined>

  constructor() {
    this.promise = new Promise<T | undefined>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })

    Object.freeze(this)
  }
}
