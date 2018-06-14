type AnyFunction = (...args: any[]) => any

export default function intercept(target: any, name: string, newMethod: AnyFunction) {
  const orig = target[name]
  target[name] = function (...args: any[]) {
    const newArgs = newMethod.call(target, ...args) || args
    return orig.call(target, ...newArgs)
  }
}