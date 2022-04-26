import LayoutRegisterAndLogin from "@components/layouts/layout-register-and-login";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import BrandRegister from "@components/for-pages/signin/brand-register/brand-register";

export default function SignIn() {
 return (
  <LayoutRegisterAndLogin
   focusIndicatorLogin={true}
   login={
    <Form className="lg:p-10 p-5">
     <Legend>Automatiza tus mensajes</Legend>
     <FieldSet>
      <Label className="block w-full">Usuario</Label>
      <Input className="block w-full" placeholder="Ingresa tu usuario" />
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Contraseña</Label>
      <Input className="block w-full" placeholder="Ingresa tu contraseña" />
     </FieldSet>
     <Button variant="highlight">Entrar</Button>
    </Form>
   }
   register={
    <div className="relative bg-main w-full h-full flex flex-col items-center justify-center">
     <div className="flex-grow">
      <div className="h-2/3">
       <BrandRegister />
      </div>
      <h1 className="text-3xl font-bold text-center text-whiter">
       Bot messages
      </h1>
     </div>
    </div>
   }
  />
 );
}
