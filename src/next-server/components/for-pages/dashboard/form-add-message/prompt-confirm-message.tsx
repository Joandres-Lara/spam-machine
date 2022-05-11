import { useFormContext } from "react-hook-form";
import { Button, FieldSet } from "@components/ui";
import { FormFieldsAddMessage } from "@interfaces/form-types";

const weeklydays = {
 monday: "Lunes",
 tuesday: "Martes",
 wednesday: "Miércoles",
 thursday: "Jueves",
 friday: "Viernes",
 saturday: "Sábados",
 sunday: "Domingos",
};

const months = {
 january: "Enero",
 february: "Febrero",
 march: "Marzo",
 april: "Abril",
 may: "Mayo",
 june: "Junio",
 july: "Julio",
 august: "Agosto",
 september: "Septiembre",
 october: "Octubre",
 november: "Noviembre",
 december: "Diciembre",
};

function parseHour(hour: string) {
 return hour;
}

export default function PromptConfirmMessage() {
 const { watch } = useFormContext();

 const values = watch();
 const { content_message, hours, periocity, month, weekly_day } =
  values as FormFieldsAddMessage;

 const [hour] = hours;

 return (
  <>
   <div>
    <span>Enviaremos este mensaje: </span>
    <span className="font-bold italic block w-full">{content_message}</span>
    {(periocity === "inmediatly" && <span> inmediatamente</span>) || (
     <>
      <>{periocity === "daily" && <span> todos los días</span>}</>
      <>
       {periocity === "weekly" && (
        <span>
         todos los {weeklydays[weekly_day as keyof typeof weeklydays]} de la
         semana
        </span>
       )}
      </>
      <>
       {periocity === "monthly" && (
        <span> cada {months[month as keyof typeof months]}</span>
       )}
      </>
      <> a las: {parseHour(hour)}</>
     </>
    )}
   </div>
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Programar mensaje</Button>
   </FieldSet>
  </>
 );
}
