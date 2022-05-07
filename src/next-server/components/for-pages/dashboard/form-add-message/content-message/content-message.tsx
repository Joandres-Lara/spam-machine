import { Button, TextArea } from "@components/ui";
import { ContactModel, normalTransformer } from "@bot-messages/util-shared";
import { useState, useCallback, useEffect, useMemo } from "react";
import useSelectedHistoryContact from "@hooks/useSelectedHistoryContact";
import useSession from "@hooks/useSession";
import { useFormContext } from "react-hook-form";
import DefaultMessages from "./default-messages";
import LabelsEditable from "./labels-editable";
import { MessageTags, TagModelEditable } from "@interfaces/types";
import Fieldset from "@components/ui/fieldset";

export default function ContentMessage() {
 const { register, setValue } = useFormContext();
 const { contact: selectedContact } = useSelectedHistoryContact();
 const { user } = useSession({
  redirectSign: true,
  redirectSigned: false,
  redirectRegistred: false,
 });

 const transform = useCallback(
  (content: { text: string }) =>
   normalTransformer(content.text, {
    contact: (selectedContact as ContactModel) || {
     name: "",
    },
    at: new Date(),
    user: user || { username: "" },
   }),
  [selectedContact, user]
 );

 const [selectedMessageTemplate, setSelectedMessageTemplate] =
  useState<null | MessageTags>(null);

 const handleSelectedMessageTemplate = useCallback(
  (message: MessageTags) => () => setSelectedMessageTemplate(message),
  []
 );

 const memoizeTags = useMemo(
  () => (selectedMessageTemplate?.tags || []) as TagModelEditable[],
  [selectedMessageTemplate]
 );

 const onChangeContentMessage = useCallback(
  () => setValue("content_message_modified", true),
  [setValue]
 );

 useEffect(() => {
  if (selectedMessageTemplate !== null) {
   setValue("content_message", transform(selectedMessageTemplate.content));
   setValue("content_message_id", selectedMessageTemplate.id);
   setValue("content_message_modified", false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [selectedMessageTemplate]);

 return (
  <>
   <div className="flex flex-row flex-wrap items-center my-2">
    <h1 className="font-bold">Contenido</h1>
    <LabelsEditable tags={memoizeTags} />
   </div>
   <TextArea
    {...register("content_message", { onChange: onChangeContentMessage })}
    placeholder="Escribe aquí, o selecciona un mensaje predeterminado desde más abajo..."
    rows={8}
    cols={60}
   />
   <input {...register("content_message_id")} type="hidden" />
   <input {...register("content_message_modified")} type="hidden" />
   <DefaultMessages
    handleSelectedMessageTemplate={handleSelectedMessageTemplate}
    transform={transform}
   />
   <Fieldset flex className="flex-row-reverse">
    <Button variant="highlight">Guardar</Button>
   </Fieldset>
  </>
 );
}
