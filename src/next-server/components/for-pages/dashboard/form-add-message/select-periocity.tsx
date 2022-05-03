import Legend from "@components/ui/legend";
import FieldSet from "@components/ui/fieldset";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import { useFormContext } from "react-hook-form";

export default function SelectPeriocity() {
 const {register} = useFormContext();
 return (
  <>
   <Legend>Selecciona una opción</Legend>
   <FieldSet>
    <Input {...register("periocity")} type="radio"/>
    <Label>Una vez</Label>
   </FieldSet>
   <FieldSet>
    <Input {...register("periocity")} type="radio"/>
    <Label>Diariamente</Label>
   </FieldSet>
   <FieldSet>
    <Input {...register("periocity")} type="radio"/>
    <Label>Semanalmente</Label>
   </FieldSet>
   <FieldSet>
    <Input {...register("periocity")} type="radio"/>
    <Label>Anualmente</Label>
   </FieldSet>
  </>
 );
}
