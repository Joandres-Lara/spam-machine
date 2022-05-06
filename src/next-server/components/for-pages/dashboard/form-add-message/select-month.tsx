import { useFormContext } from "react-hook-form";
import { FieldSet, Input, Label } from "@components/ui";

export default function SelectMonth() {
 const { register } = useFormContext();
 return (
  <div>
   {[
    ["Enero", "january"],
    ["Febrero", "february"],
    ["Marzo", "march"],
    ["Abril", "april"],
    ["Mayo", "may"],
    ["Junio", "june"],
    ["Julio", "july"],
    ["Agosto", "august"],
    ["Septiembre", "september"],
    ["Octubre", "october"],
    ["Noviembre", "november"],
    ["Diciembre", "december"],
   ].map(([label, key]) => (
    <FieldSet key={key}>
     <Input
      id={`select-month-${key}`}
      defaultValue={key}
      {...register("month")}
      type="radio"
     />
     <Label htmlFor={`select-month-${key}`}>{label}</Label>
    </FieldSet>
   ))}
  </div>
 );
}
