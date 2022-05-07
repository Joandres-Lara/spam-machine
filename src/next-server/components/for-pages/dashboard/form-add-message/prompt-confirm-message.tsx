import { useFormContext } from "react-hook-form";
import { Button, FieldSet } from "@components/ui";

const weeklydays = {
 monday: "Lunes",
 tuesday: "Martes",
 wednesday: "Miércoles",
 thursday: "Jueves",
 friday: "Viernes",
 saturday: "Sábados",
 sunday: "Domingo",
};

function parseHour(hour: string) {
 return hour;
}

export default function PromptConfirmMessage() {
 const { watch } = useFormContext();

 const values = watch();
 const { content_message, hours, periocity, month, weekly_day } = values as {
  content_message: string;
  hours: string[];
  periocity: string;
  month: string;
  weekly_day: string;
 };

 const [hour] = hours;

 console.log({ values });

 return (
  <>
   <div>
    <div>Enviaremos este mensaje:</div>
    <pre>{content_message}</pre>
    {(periocity === "inmediatly" && <div>Inmediatamente</div>) || (
     <>
      <>{periocity === "daily" && <div>Todos los días</div>}</>
      <>
       {periocity === "weekly" && (
        <div>Todos los {weeklydays[weekly_day as keyof typeof weeklydays]}</div>
       )}
      </>
      <>a las: {parseHour(hour)}</>
     </>
    )}
   </div>
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Programar mensaje</Button>
   </FieldSet>
  </>
 );
}
