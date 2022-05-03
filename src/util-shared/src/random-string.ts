function fallbackUUID(length: number) {
 try {
  return crypto.randomUUID().slice(0, length);
 } catch (e) {
  return Math.random().toString(36).slice(3).slice(0, length);
 }
}

export default function randomString(length = 10) {
 let str = "";
 while (str.length < length) {
  str += fallbackUUID(length);
 }
 return str.slice(0, length);
}
