import { StyledLink, Text, TextArea } from "@components/ui";
import useCreateMessageTemplate from "@hooks/useCreateMessageTemplate";
import useTransformContentMessage from "@hooks/useTransformContentMessage";
import { MessageTags } from "@interfaces/types";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function TextAreaContentMessage({
 selectedMessageTemplate,
 setSelectedMessageTemplate,
}: {
 selectedMessageTemplate: MessageTags | null;
 setSelectedMessageTemplate: (m: MessageTags) => void;
}) {
 const { create: createMessageTemplate, loading: creatingMessageTemplate } =
  useCreateMessageTemplate();
 const transform = useTransformContentMessage();
 const { register, watch, setValue } = useFormContext();
 const [isTouched, setIsTouched] = useState(false);

 const onChangeContentMessage = useCallback(() => setIsTouched(true), []);

 const watchContentMessage = watch("content_message");

 useEffect(() => {
  if (isTouched) {
   if (selectedMessageTemplate) {
    return;
   }

   const timer = setTimeout(async () => {
    const messageCreated = await createMessageTemplate({
     content: {
      text: watchContentMessage,
      format: "normal",
     },
    });

    setSelectedMessageTemplate(messageCreated);
   }, 1000);

   return () => clearTimeout(timer);
  }
 }, [
  createMessageTemplate,
  selectedMessageTemplate,
  isTouched,
  watchContentMessage,
  setSelectedMessageTemplate,
 ]);

 useEffect(() => {
  if (selectedMessageTemplate !== null) {
   setValue("content_message", transform(selectedMessageTemplate.content));
   setValue("content_message_id", selectedMessageTemplate.id);
  }
 }, [setValue, transform, selectedMessageTemplate]);

 return (
  <>
   <TextArea
    {...register("content_message", { onChange: onChangeContentMessage })}
    disabled={creatingMessageTemplate}
    placeholder="Escribe aquí, o selecciona un mensaje predeterminado desde más abajo..."
    rows={8}
    cols={60}
   />
   {creatingMessageTemplate && (
    <Text variant="small">
     Creando plantilla... no te olvides de agregarle alguna etiqueta
    </Text>
   )}
   {isTouched && selectedMessageTemplate !== null && (
    <Text variant="small">
     Has modificado está plantilla, ¿deseas crear una nueva? Si no lo haces la
     modificación del mensaje será ignorada. Ó puedes modificar está plantilla,
     pero esto hará que todos los nuevos mensajes para está plantilla también
     cambien.
     <div className="w-full flex flex-row justify-around">
      <StyledLink>
       Si quiero crear una nueva plantilla a partir de esta
      </StyledLink>
      <StyledLink>
       Modificar está plantilla para los siguientes mensajes
      </StyledLink>
      <StyledLink>No ignorar modificación</StyledLink>
     </div>
    </Text>
   )}
   <input {...register("content_message_id")} type="hidden" />
  </>
 );
}
