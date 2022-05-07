import { randomString } from "@bot-messages/util-shared";

export type FnSubscriptor<T = unknown> = (key: string, value: T) => void;

export interface FnSubscriptorWithKey<T = unknown> extends FnSubscriptor<T> {
 cache_key?: string;
}

export default class ObservableCache {
 declare __cached: Record<string, unknown>;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 declare __subscribers: Record<string, FnSubscriptor<any>[]>;

 constructor(defaultCache: Record<string, unknown> = {}) {
  this.__cached = defaultCache;
  this.__subscribers = {};
 }

 set<T = unknown>(key: string, value: T) {
  this.__cached[key] = value;
  this.dispatch(key, value);
 }

 get<T = unknown>(key: string, defaultValue?: T): T {
  return (this.__cached[key] || defaultValue) as T;
 }

 clear() {
  this.__cached = {};
 }

 createSubscriber<T = unknown>(fn: FnSubscriptor<T>) {
  const f = fn as FnSubscriptorWithKey;
  f.cache_key = f.cache_key || randomString(15);
  return f;
 }

 subscribe<T = unknown>(key: string, fn: FnSubscriptor<T>) {
  const subscribers = (this.__subscribers[key] = this.__subscribers[key] || []);

  if (!subscribers.includes(fn)) {
   subscribers.push(fn);
  }

  return () => {
   subscribers.splice(
    subscribers.findIndex((f) => f === fn),
    1
   );
  };
 }

 unsubscribe(key: string, fn: FnSubscriptor) {
  const subscribers = this.getSubscribesByKey(key);
  subscribers.splice(
   subscribers.findIndex((f) => f === fn),
   1
  );
 }

 private getSubscribesByKey(key: string) {
  return (this.__subscribers[key] = this.__subscribers[key] || []);
 }

 private callSubscribersByKey(key: string, value: unknown) {
  this.getSubscribesByKey(key).forEach((fn) => {
   fn(key, value);
  });
 }

 private callAllSubscribers(key: string, value: unknown) {
  this.getSubscribesByKey("*").forEach((fn) => {
   fn(key, value);
  });
 }

 private dispatch(key: string, value: unknown) {
  this.callAllSubscribers(key, value);
  this.callSubscribersByKey(key, value);
 }
}
