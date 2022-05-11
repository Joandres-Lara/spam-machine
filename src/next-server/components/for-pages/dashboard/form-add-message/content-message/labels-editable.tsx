import classes from "./labels-editable.module.css";
import PlusSvg from "@assets/plus.svg";
import CrossSvg from "@assets/cross.svg";
import { useCallback, useEffect } from "react";
import { MessageTags, TagModelEditable } from "@interfaces/types";
import { useFormContext, useFieldArray } from "react-hook-form";
import { randomBetween } from "@bot-messages/util-shared";
import useCreateTag from "@hooks/useCreateTag";
import useUpdateTagsMessageTemplate from "@hooks/useUpdateTagsMessageTemplate";

function pickRandomColor() {
 // prettier-ignore
 return `rgb(${randomBetween(0, 255)}, ${randomBetween(0,255)}, ${randomBetween(0, 255)})`;
}

export default function LabelsEditable({
 tags,
 selectedMessageTemplate,
}: {
 tags: TagModelEditable[];
 selectedMessageTemplate: MessageTags | null;
}) {
 const { register, control, getValues } = useFormContext<{
  labels: TagModelEditable[];
 }>();
 const { create: createTag, loading: loadingCreateTag } = useCreateTag();
 const { update: updateTagsMessageTemplate } = useUpdateTagsMessageTemplate({
  messageId: selectedMessageTemplate?.id || -1,
 });

 const { fields, append, remove, update } = useFieldArray({
  control,
  name: "labels",
  keyName: "_id",
 });

 const handleAddTag = useCallback(() => {
  append({
   label: "",
   color: pickRandomColor(),
  });
 }, [append]);

 const handleBlurTagLabel = useCallback(
  (id: number, index: number) => async () => {
   const [label, color] = getValues([
    `labels.${index}.label`,
    `labels.${index}.color`,
   ]);

   if (label.trim() !== "") {
    if (id === null || id === undefined) {
     const tagCreated = await createTag({
      label,
      color,
      attach_to: selectedMessageTemplate?.id,
     });

     update(index, tagCreated as TagModelEditable);
    }
   }
  },
  [createTag, getValues, update, selectedMessageTemplate]
 );

 const handlePickColorTag = useCallback(
  (id: number) => () => {
   console.log("Pick color", { id });
  },
  []
 );

 const handleRemoveTag = useCallback(
  (id: number) => () => {
   console.log("Remove tag", { id });
  },
  []
 );

 useEffect(() => {
  append(tags);
  return () => {
   remove(tags.map((...[, i]) => i));
  };
 }, [tags, append, remove]);

 return (
  <>
   <h2 className={classes.labels_editable__head}>Etiquetas</h2>
   {fields.map((field, index) => {
    return (
     <span
      key={field._id}
      style={{ borderColor: field.color, color: field.color }}
      className={classes.labels_editable__label_item}
     >
      <span
       onClick={handlePickColorTag(field.id, index)}
       className={classes.labels_editable__pick_color}
       style={{ backgroundColor: field.color }}
      />
      <input
       className={classes.labels_editable__input}
       placeholder="Busca tu etiqueta o crea una nueva"
       {...register(`labels.${index}.label`, {
        onBlur: handleBlurTagLabel(field.id, index),
       })}
      />
      <input
       {...register(`labels.${index}.id`)}
       disabled={loadingCreateTag}
       type="hidden"
      />
      <input
       {...register(`labels.${index}.color`)}
       disabled={loadingCreateTag}
       type="hidden"
      />
      <CrossSvg onClick={handleRemoveTag(field.id, index)} />
     </span>
    );
   })}
   <span
    data-cy="form-add-message__add-label"
    onClick={handleAddTag}
    className={classes.labels_editable__add_label}
   >
    <PlusSvg />
   </span>
  </>
 );
}
