interface Array<T> {
  includes(item: T): boolean
}

interface ObjectConstructor {
  keys<O extends {[key: string]: any}>(o: O): Array<string & keyof O>
  keys<O extends {[key: number]: any}>(o: O): Array<number & keyof O>
  keys<O>(o: O): Array<keyof O>

  values<O>(o: O): Array<O[keyof O]>
}