import LayoutRegisterAndLogin from "@components/layouts/layout-register-and-login";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import Form from "@components/ui/form";
import BrandRegister from "@components/for-pages/signin/brand-register";
import useRegister from "@hooks/useRegister";
import { useForm } from "react-hook-form";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";

interface Fields {
 username: string;
 password: string;
 password_confirm: string;
}

export default function Register() {
 const registerUser = useRegister();
 const { handleSubmit, register } = useForm<Fields>();

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
    <Form className="lg:p-10 p-5" onSubmit={handleSubmit(registerUser)}>
     <Legend>Que no se te olviden los mensajes importantes</Legend>
     <FieldSet>
      <Label className="block w-full">Usuario</Label>
      <Input
       {...register("username")}
       className="block w-full"
       placeholder="Ingresa un usuario"
      />
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Contraseña</Label>
      <Input
       {...register("password")}
       className="block w-full"
       placeholder="Ingresa tu contraseña"
      />
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Confirmar contraseña</Label>
      <Input
       name="password"
       type="password"
       className="block w-full"
       placeholder="Repite la contraseña de arriba"
      />
     </FieldSet>
     <Button variant="highlight">Registrar</Button>
    </Form>
   }
  />
 );
}
