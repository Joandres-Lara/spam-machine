import { FieldSet, Legend, Input, Label, Button } from "@components/ui";
import { useFormContext } from "react-hook-form";

export default function SelectWeeklyDay() {
 const { register } = useFormContext();
 return (
  <>
   <Legend variant="md">¿Qué día de la semana?</Legend>
   <FieldSet>
    {[
     ["Lunes", "monday"],
     ["Martes", "tuesday"],
     ["Miércoles", "wednesday"],
     ["Jueves", "thursday"],
     ["Viernes", "friday"],
     ["Sábado", "saturday"],
     ["Domingo", "sunday"],
    ].map(([label, key]) => (
     <FieldSet key={key}>
      <Input
       id={`select-weekly-day-${key}`}
       defaultValue={key}
       {...register("weekly_day")}
       type="radio"
      />
      <Label htmlFor={`select-weekly-day-${key}`}>{label}</Label>
     </FieldSet>
    ))}
   </FieldSet>
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Guardar</Button>
   </FieldSet>
  </>
 );
}
