import Legend from "@components/ui/legend";
import FieldSet from "@components/ui/fieldset";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import Button from "@components/ui/button";
import { useFormContext } from "react-hook-form";

export default function SelectPeriocity() {
 const { register } = useFormContext();
 return (
  <>
   <Legend>Selecciona una opción</Legend>
   <FieldSet>
    <Legend variant="sm">¿Cada cuánto quieres que se repita?</Legend>
    {[
     ["Inmediatamente", "inmediatly"],
     ["Más tarde", "late"],
     ["Diariamente", "daily"],
     ["Semanalmente", "weekly"],
     ["Anualmente", "yearly"],
    ].map(([label, key]) => (
     <FieldSet key={key}>
      <Input
       {...register("periocity")}
       id={`periocity-${key}`}
       defaultValue={key}
       type="radio"
      />
      <Label htmlFor={`periocity-${key}`}>{label}</Label>
     </FieldSet>
    ))}
   </FieldSet>
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Siguiente</Button>
   </FieldSet>
  </>
 );
}
