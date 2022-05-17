import LayoutRegisterAndLogin from "@components/layouts/layout-register-and-login";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Form from "@components/ui/form";
import Error from "@components/error";
import Success from "@components/success";
import BrandRegister from "@components/for-pages/signin/brand-register";
import useRegister from "@hooks/useRegister";
import { SubmitHandler, useForm } from "react-hook-form";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useCallback, useState } from "react";

const schema = object().shape({
 username: string().min(5).max(25).required(),
 password: string().min(5).max(25).required(),
 password_confirm: string()
  .min(5)
  .test({
   name: "password_confirm",
   exclusive: false,
   message: "Las contraseñas deben ser iguales",
   test: function (value) {
    return value === this.parent.password;
   },
  })
  .required(),
});

interface Fields {
 username: string;
 password: string;
 password_confirm: string;
}

interface FormRegistredState {
 status: "unsubmited" | "completed" | "error";
 message?: string;
}

export default function Register() {
 const registerUser = useRegister();

 const {
  handleSubmit,
  register,
  formState: { errors },
 } = useForm<Fields>({
  resolver: yupResolver(schema),
 });

 const [statusRegister, setStatusRegister] = useState<FormRegistredState>({
  status: "unsubmited",
 });

 const handleRegisterUser = useCallback(
  async (values) => {
   try {
    await registerUser(values);
    setStatusRegister({
     status: "completed",
     message: "Usuario creado...",
    });
   } catch (e) {
    setStatusRegister({
     status: "error",
     message: (e as Error).toString(),
    });
   }
  },
  [registerUser]
 ) as SubmitHandler<Fields>;

 useRedirectIfAuthenticated();

 return (
  <LayoutRegisterAndLogin
   focusIndicatorRegister={true}
   loginSection={
    <div className="relative bg-main w-full h-full flex flex-col items-center justify-center p-5">
     <BrandRegister />
     <h1 className="text-3xl font-bold text-center text-whiter my-5">
      Bot messages
     </h1>
    </div>
   }
   registerSection={
    <Form className="lg:p-10 p-5" onSubmit={handleSubmit(handleRegisterUser)}>
     <Legend>Que no se te olviden los mensajes importantes</Legend>
     {statusRegister.status === "completed" && (
      <Success>Usuario creado</Success>
     )}
     {statusRegister.status === "error" && (
      <Error>
       Ocurrio un error al crear el usuario, intenta más tarde o con otro nombre
       de usuario
      </Error>
     )}
     <FieldSet>
      <Label className="block w-full">Usuario</Label>
      <Input
       {...register("username")}
       className="block w-full"
       placeholder="Ingresa un usuario"
      />
      {errors.username && <Error>{errors.username.message}</Error>}
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Contraseña</Label>
      <Input
       {...register("password")}
       type="password"
       className="block w-full"
       placeholder="Ingresa tu contraseña"
      />
      {errors.password && <Error>{errors.password.message}</Error>}
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Confirmar contraseña</Label>
      <Input
       {...register("password_confirm")}
       type="password"
       className="block w-full"
       placeholder="Repite la contraseña de arriba"
      />
      {errors.password_confirm && (
       <Error>{errors.password_confirm.message}</Error>
      )}
     </FieldSet>
     <Button variant="highlight">Registrar</Button>
    </Form>
   }
  />
 );
}
