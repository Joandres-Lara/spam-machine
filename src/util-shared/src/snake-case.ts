export default function snakeCase(dirtyString: string) {
 return dirtyString.toLowerCase().replace(/\s+/g, "_");
}
