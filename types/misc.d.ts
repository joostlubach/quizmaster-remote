type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type AnyFunction = (...args: any[]) => any
type AnyObject = {[key: string]: any}
type Constructor<T> = new (...args: any[]) => T
type AnyConstructor = Constructor<any>

type Primitive = number | string | boolean | null