import useSession from "./useSession";

export default function useUser() {
 const { user } = useSession({
  redirectSign: true,
  redirectSigned: false,
  redirectRegistred: false,
 });
 return user;
}
