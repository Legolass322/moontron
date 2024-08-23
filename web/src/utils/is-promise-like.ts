import {isPlainObject} from './is-plain-object'

export const isPromiseLike = <T>(element: unknown): element is Promise<T> => {
  return isPlainObject(element) && 'then' in element
}
