import { useFormContext } from "react-hook-form";
import { FieldSet, Input, Label, Legend, Button } from "@components/ui";

export default function SelectMonth() {
 const { register } = useFormContext();
 return (
  <>
   <Legend variant="md">¿Qué mes del año?</Legend>
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
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Guardar</Button>
   </FieldSet>
  </>
 );
}
