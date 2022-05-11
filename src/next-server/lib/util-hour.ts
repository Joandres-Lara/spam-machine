export function normalizeChunk(i: number) {
 return i.toString().padStart(2, "0");
}

export function templateHour(date: Date) {
 return (
  normalizeChunk(date.getHours()) +
  ":" +
  normalizeChunk(date.getMinutes()) +
  ":" +
  normalizeChunk(date.getSeconds())
 );
}
