function normalize(s : string){
 if(s.length > 0){
  return s[0].toUpperCase() + s.slice(1);
 }
 return s;
}

export default function camelCase(
 dirtyString: string,
 firstLetterUppercase = false
) {
 let transformed = dirtyString
  .replace(/\s+/, "-")
  .split(/[-]/)
  .map(normalize)
  .join("");

 if(firstLetterUppercase){
  transformed = normalize(transformed);
 }

 return transformed;
}
