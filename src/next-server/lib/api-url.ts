export default function apiURL(chunk : string){
 return `${process.env.NEXT_PUBLIC_DATABASE_API_SERVER_URL}${chunk}`;
}
