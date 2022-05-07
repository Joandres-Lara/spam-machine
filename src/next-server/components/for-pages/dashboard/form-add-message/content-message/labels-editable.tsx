import PlusSvg from "@assets/plus.svg";
import CrossSvg from "@assets/cross.svg";
import { useCallback, useEffect } from "react";
import { TagModelEditable } from "@interfaces/types";
import { useFormContext, useFieldArray } from "react-hook-form";
import { randomBetween } from "@bot-messages/util-shared";

function pickRandomColor() {
 // prettier-ignore
 return `rgb(${randomBetween(0, 255)}, ${randomBetween(0,255)}, ${randomBetween(0, 255)})`;
}

export default function LabelsEditable({ tags }: { tags: TagModelEditable[] }) {
 const { register, control } = useFormContext();
 const { fields, append, remove } = useFieldArray({
  control,
  name: "labels",
 });

 const handleAddTag = useCallback(() => {
  append({
   recient_created: true,
   label: "",
   color: pickRandomColor(),
  });
 }, [append]);

 useEffect(() => {
  append(tags);
  return () => {
   remove(tags.map((...[, i]) => i));
  };
 }, [tags, append, remove]);

 return (
  <>
   <h2 className="mx-3 font-bold">Etiquetas</h2>
   {fields.map((field, index) => (
    <span
     key={field.id}
     // TODO: This for ui view.
     // style={{ borderColor: tag.color, color: tag.color }}
     className="flex flex-row items-center border mx-2 py-0.5 px-3 rounded-full"
    >
     <input
      className="text-sm"
      placeholder="Aquí el nombre de tu etiqueta"
      {...register(`labels.${index}.label`)}
     />
     <input {...register(`labels.${index}.id`)} type="hidden" />
     <input {...register(`labels.${index}.color`)} type="hidden" />
     <CrossSvg onClick={() => remove(index)} />
    </span>
   ))}
   <span
    onClick={handleAddTag}
    className="cursor-pointer rounded-full border border-main w-5 h-5 flex justify-center items-center"
   >
    <PlusSvg />
   </span>
  </>
 );
}
