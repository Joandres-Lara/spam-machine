import { randomString } from "@bot-messages/util-shared";

export type FnSubscriptor = (key: string, value: unknown) => void;

export interface FnSubscriptorWithKey extends FnSubscriptor {
 cache_key?: string;
}

export default class ObservableCache {
 declare __cached: Record<string, unknown>;
 declare __subscribers: Record<string, FnSubscriptor[]>;

 construct(defaultCache: Record<string, unknown> = {}) {
  this.__cached = defaultCache;
  this.__subscribers = {};
 }

 set(key: string, value: unknown) {
  this.__cached[key] = value;
  this.dispatch(key, value);
 }

 get(key: string) {
  return this.__cached[key];
 }

 clear() {
  this.__cached = {};
 }

 createSubscriber(fn: FnSubscriptor) {
  const f = fn as FnSubscriptorWithKey;
  f.cache_key = f.cache_key || randomString(15);
  return f;
 }

 subscribe(key: string, fn: FnSubscriptor) {
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
  const subscribers = (this.__subscribers[key] = this.__subscribers[key] || []);
  subscribers.splice(
   subscribers.findIndex((f) => f === fn),
   1
  );
 }

 private callSubscribersByKey(key: string, value: unknown) {
  this.__subscribers[key].forEach((fn) => {
   fn(key, value);
  });
 }

 private callAllSubscribers(key: string, value: unknown) {
  this.__subscribers["*"].forEach((fn) => {
   fn(key, value);
  });
 }

 private dispatch(key: string, value: unknown) {
  this.callAllSubscribers(key, value);
  this.callSubscribersByKey(key, value);
 }
}
