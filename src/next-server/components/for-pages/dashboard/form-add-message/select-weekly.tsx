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
    <Input {...register("weekly")} type="radio" />
    <Label>Lunes</Label>
   </FieldSet>
  </>
 );
}
