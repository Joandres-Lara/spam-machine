type DefaultFn = (...args : never[]) => void;

export default function combineFns<T extends DefaultFn>(...fns: T[]) {
 return (...args: Parameters<T>) => {
  fns.forEach((fn) => fn(...args));
 };
}
