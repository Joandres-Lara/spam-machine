import Modal from "@components/modal";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function FormAddMessage() {
 const router = useRouter();

 return (
  <Modal
   open
   onClose={useCallback(() => {
    router.push("/dashboard");
   }, [router])}
  ></Modal>
 );
}
