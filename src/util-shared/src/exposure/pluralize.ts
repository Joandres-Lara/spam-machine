/**
 * Pluralize string
 * NOTE: This does not check if the text can be pluralized
 *
 * @example `module -> modules`
 * @example `modules -> modules`
 * @example `dry`
 *
 * @param {string} singular
 * @returns {string}
 */
export default function pluralize(singular : string){
 if(singular[singular.length - 1] === "y"){
  return singular.slice(-1) + "ies";
 } else if(singular[singular.length - 1] !== "s"){
  return singular + "s";
 }
 return singular;
}
