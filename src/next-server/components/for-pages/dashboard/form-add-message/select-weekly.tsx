import FieldSet from "@components/ui/fieldset";
import Legend from "@components/ui/legend";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import { useFormContext } from "react-hook-form";

export default function SelectWeekly() {
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
       id={`select-weekly-${key}`}
       defaultValue={key}
       {...register("weekly")}
       type="radio"
      />
      <Label htmlFor={`select-weekly-${key}`}>{label}</Label>
     </FieldSet>
    ))}
   </FieldSet>
  </>
 );
}
