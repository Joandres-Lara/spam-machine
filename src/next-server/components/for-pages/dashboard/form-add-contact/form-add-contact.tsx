import Form from "@components/ui/form";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Input from "@components/ui/input";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import Avatar from "@components/avatar";
import Modal from "@components/modal";
import { useRouter } from "next/router";
import useCreateContact from "@hooks/useCreateContact";
import { UserModel } from "@bot-messages/util-shared";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import useSession from "@hooks/useSession";

interface FormFields {
 name: string;
 phone: string;
 avatar: string;
}

export default function AddContact() {
 const router = useRouter();
 const { create } = useCreateContact();
 const { register, handleSubmit } = useForm<FormFields>();
 const { refresh } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const createContact = useCallback(
  async (values: FormFields) => {
   const { token } = (await refresh()) as UserModel;
   await create({ ...values, token });
  },
  [create, refresh]
 );

 return (
  <Modal
   open
   onClose={() => {
    router.push("/dashboard");
   }}
  >
   <div className="flex flex-row justify-center">
    <Form
     id="form-add-contact"
     className="flex flex-col items-center w-1/2"
     onSubmit={handleSubmit(createContact)}
    >
     <Legend variant="md">Está persona debe ser muy importante para ti</Legend>
     <Avatar src="/avatars/default-avatar.png" size="lg" />
     <FieldSet className="block w-full">
      <Label className="block w-full">Nombre</Label>
      <input
       {...register("avatar")}
       type="hidden"
       defaultValue="/avatars/default-avatar.png"
      />
      <Input
       {...register("name")}
       className="block w-full"
       placeholder="Ingresa el nombre del contacto"
      />
     </FieldSet>
     <FieldSet className="block w-full">
      <Label className="block w-full">Número de teléfono</Label>
      <Input
       {...register("phone")}
       className="block w-full"
       placeholder="Ingresa el teléfono de contacto"
      />
     </FieldSet>
     <FieldSet className="block w-full">
      <Button variant="highlight">Guardar</Button>
     </FieldSet>
    </Form>
   </div>
  </Modal>
 );
}
