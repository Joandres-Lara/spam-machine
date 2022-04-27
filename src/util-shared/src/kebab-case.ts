export default function kebabCase(dirtyString: string) {
 return dirtyString.toLowerCase().replace(/\s+/, "-");
}
