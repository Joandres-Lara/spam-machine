import LayoutRegisterAndLogin from "@components/layouts/layout-register-and-login";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import BrandRegister from "@components/for-pages/signin/brand-register";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";

export default function SignIn() {

 useRedirectIfAuthenticated();

 return (
  <LayoutRegisterAndLogin
   focusIndicatorLogin={true}
   loginSection={
    <Form
     className="lg:p-10 p-5"
     method="POST"
     action="/api/auth/login"
    >
     <Legend className="lg:text-left text-center">
      Automatiza tus mensajes
     </Legend>
     <FieldSet>
      <Label className="block w-full">Usuario</Label>
      <Input
       name="username"
       className="block w-full"
       placeholder="Ingresa tu usuario"
      />
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Contraseña</Label>
      <Input
       name="password"
       type="password"
       className="block w-full"
       placeholder="Ingresa tu contraseña"
      />
     </FieldSet>
     <Button variant="highlight">Entrar</Button>
    </Form>
   }
   registerSection={
    <div className="relative bg-main w-full h-full flex flex-col items-center justify-center p-5">
     <BrandRegister />
     <h1 className="text-3xl font-bold text-center text-whiter my-5">
      Bot messages
     </h1>
    </div>
   }
  />
 );
}
