import LayoutRegisterAndLogin from "@components/layouts/layout-register-and-login";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import FieldSet from "@components/ui/fieldset";
import Label from "@components/ui/label";
import Error from "@components/error";
import Legend from "@components/ui/legend";
import Button from "@components/ui/button";
import Success from "@components/success";
import BrandRegister from "@components/for-pages/signin/brand-register";
import useRedirectIfAuthenticated from "@hooks/useRedirectIfAuthenticated";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import useLogin from "@hooks/useLogin";
import { useCallback, useState } from "react";

const schema = object().shape({
 username: string().required(),
 password: string().required(),
});

interface FormFields {
 username: string;
 password: string;
}

interface FormLoginState {
 status: "incompleted" | "error" | "success";
 message?: string;
}

export default function SignIn() {
 const {
  handleSubmit,
  register,
  formState: { errors },
 } = useForm<FormFields>({
  resolver: yupResolver(schema),
 });

 const login = useLogin();

 const [loginState, setLoginState] = useState<FormLoginState>({
  status: "incompleted",
  message: "",
 });

 const handleLogin = useCallback(
  async (values) => {
   try {
    await login(values);
    setLoginState({
     status: "success",
     message: "Redirigiendo...",
    });
   } catch (e) {
    setLoginState({
     status: "error",
     message: (e as Error).toString(),
    });
   }
  },
  [login]
 ) as SubmitHandler<FormFields>;

 useRedirectIfAuthenticated();

 return (
  <LayoutRegisterAndLogin
   focusIndicatorLogin={true}
   loginSection={
    <Form className="lg:p-10 p-5" onSubmit={handleSubmit(handleLogin)}>
     <Legend className="lg:text-left text-center">
      Automatiza tus mensajes
     </Legend>
     {loginState.status === "error" && (
      <Error>
       {loginState.message?.includes("Can't find user") &&
        "No pudimos encontrar el usuario"}
       {loginState.message?.includes("Invalid password") &&
        "Contraseña incorrecta"}
      </Error>
     )}
     {loginState.status === "success" && (
      <Success>{loginState.message}</Success>
     )}
     <FieldSet>
      <Label className="block w-full">Usuario</Label>
      <Input
       {...register("username")}
       className="block w-full"
       placeholder="Ingresa tu usuario"
      />
      {errors.password && <Error>{errors.password.message}</Error>}
     </FieldSet>
     <FieldSet>
      <Label className="block w-full">Contraseña</Label>
      <Input
       {...register("password")}
       type="password"
       className="block w-full"
       placeholder="Ingresa tu contraseña"
      />
      {errors.username && <Error>{errors.username.message}</Error>}
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
