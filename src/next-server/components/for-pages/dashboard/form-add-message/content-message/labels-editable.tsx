import classes from "./labels-editable.module.css";
import PlusSvg from "@assets/plus.svg";
import CrossSvg from "@assets/cross.svg";
import { Text } from "@components/ui";
import {
 MutableRefObject,
 useCallback,
 useEffect,
 useState,
 useRef,
} from "react";
import { MessageTags, TagModelEditable } from "@interfaces/types";
import { join, randomBetween } from "@bot-messages/util-shared";
import useCreateTag from "@hooks/useCreateTag";
import useUpdateTagsMessageTemplate from "@hooks/useUpdateTagsMessageTemplate";
import useFindTags from "@hooks/useFindTags";

function pickRandomColor() {
 // prettier-ignore
 return `rgb(${randomBetween(0, 255)}, ${randomBetween(0,255)}, ${randomBetween(0, 255)})`;
}

export default function LabelsEditable({
 tags,
 selectedMessageTemplate,
 onUpdateTags,
}: {
 tags: TagModelEditable[];
 selectedMessageTemplate: MessageTags | null;
 onUpdateTags: (message: MessageTags) => void;
}) {
 const [tagsState, setTagsState] = useState<TagModelEditable[]>([]);
 const [activeSelectableTags, setActiveSelectableTags] = useState(false);

 const { create: createTag } = useCreateTag();

 const {
  find: findTags,
  loading: loadingFindTags,
  tags: findedTags,
 } = useFindTags();

 const { update: updateTagsMessage } = useUpdateTagsMessageTemplate({
  messageId: selectedMessageTemplate?.id || -1,
 });

 const refInput = useRef<HTMLInputElement>(null);
 const [randomColor, setRandomColor] = useState<string>(pickRandomColor());
 const [statusError, setStatusError] = useState<string>();
 const refTimerSearchTag = useRef<NodeJS.Timeout>(
  null
 ) as MutableRefObject<NodeJS.Timeout>;

 const handleOnKeyUpInputSearchTag = useCallback(() => {
  setStatusError(undefined);
  clearTimeout(refTimerSearchTag.current);
  refTimerSearchTag.current = setTimeout(async () => {
   const value = refInput.current?.value || "";
   if (value.trim() !== "") {
    setActiveSelectableTags(true);
    await findTags({ by: "label", value });
   }
  }, 1000);
 }, [findTags]);

 const handleOnFocusInputSearchTag = useCallback(() => {
  setStatusError(undefined);
  setActiveSelectableTags(true);
 }, []);

 const handleAddNewTag = useCallback(async () => {
  if (
   selectedMessageTemplate?.id !== null &&
   selectedMessageTemplate?.id !== undefined
  ) {
   const value = refInput.current?.value || "";
   if (value.trim() !== "") {
    await createTag({ label: value, color: randomColor });
   }
  } else {
   setStatusError("No se puede crear una etiqueta sin mensaje");
  }
 }, [selectedMessageTemplate, createTag, randomColor]);

 const handleSelectSearchTag = useCallback(
  (id: number) => async () => {
   if (
    selectedMessageTemplate?.id !== null &&
    selectedMessageTemplate?.id !== undefined
   ) {
    const updatedTagsMessage = await updateTagsMessage([id]);
    setActiveSelectableTags(false);
    onUpdateTags(updatedTagsMessage);
   } else {
    setStatusError("No se asignar está etiqueta sin haber creado un mensaje");
   }
  },
  [selectedMessageTemplate, updateTagsMessage, onUpdateTags]
 );

 const handleDeleteTag = useCallback(
  (id: number) => () => updateTagsMessage([id]),
  [updateTagsMessage]
 );

 const handlePickRandomColor = useCallback(
  () => setRandomColor(pickRandomColor()),
  []
 );

 const handleCloseSelecteableTags = useCallback(() => {
  setActiveSelectableTags(false);
 }, []);

 useEffect(() => {
  setTagsState(tags);
 }, [tags]);

 return (
  <>
   <h2 className={classes.labels_editable__head}>Etiquetas:</h2>
   <div className={classes.labels_editable__wrapper_labels}>
    {tagsState.length === 0 && (
     <Text variant="small" className="mr-1">
      Sin etiquetas para mostrar
     </Text>
    )}
    {tagsState.map((tag, i) => (
     <div
      style={{ borderColor: tag.color, color: tag.color }}
      key={i}
      className={classes.labels_editable__label_item}
     >
      <div
       style={{ backgroundColor: tag.color }}
       className={classes.labels_editable__pick_color}
      />
      {tag.label}
      <div onClick={handleDeleteTag(tag.id)}>
       <CrossSvg />
      </div>
     </div>
    ))}
    {/* TODO: Tentative individual component */}
    <div
     style={{ backgroundColor: randomColor }}
     className={classes.labels_editable__pick_color}
     onClick={handlePickRandomColor}
    />
    <input
     placeholder="Busca alguna etiqueta o crea una nueva"
     onKeyUp={handleOnKeyUpInputSearchTag}
     onFocus={handleOnFocusInputSearchTag}
     ref={refInput}
    />
    <Text variant={["small", "gray"]}>{statusError}</Text>
    <nav
     className={join(
      classes.labels_editable__selectable_labels,
      activeSelectableTags
       ? classes["labels_editable__selectable_labels--active"]
       : ""
     )}
    >
     <div
      className="absolute top-1 right-1"
      onClick={handleCloseSelecteableTags}
     >
      <CrossSvg />
     </div>
     <ul>
      <li
       className={classes.labels_editable__selectable_labels__label}
       onClick={handleAddNewTag}
      >
       <PlusSvg />
       Crear nueva etiqueta {refInput.current?.value}
      </li>
      {loadingFindTags && <>Obteniendo etiquetas...</>}
      {findedTags?.map((tag, i) => (
       <li
        className={classes.labels_editable__selectable_labels__label}
        tabIndex={i + 2}
        key={i}
        onClick={handleSelectSearchTag(tag.id)}
       >
        {tag.label}
       </li>
      ))}
     </ul>
    </nav>
   </div>
  </>
 );
}
