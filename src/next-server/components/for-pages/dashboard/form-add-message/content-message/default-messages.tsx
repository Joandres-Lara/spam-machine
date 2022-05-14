import classes from "./content-message.module.css";
import { useState, useCallback } from "react";
import { join } from "@bot-messages/util-shared";
import useTagsMessages from "@hooks/useTagsMessages";
import { MessageTags } from "@interfaces/types";
import useTransformContentMessage from "@hooks/useTransformContentMessage";

export default function DefaultMessages({
 onSelectedMessageTemplate,
}: {
 onSelectedMessageTemplate: (message: MessageTags) => () => void;
}) {
 const transform = useTransformContentMessage();
 const { tags } = useTagsMessages();
 const [selectedTag, setSelectedTag] = useState(1);
 const handleSelectTag = useCallback(
  (id: number) => () => setSelectedTag(id),
  []
 );

 return (
  <>
   {/* NOTE: Candidate to transform individual component */}
   <h1 className="font-bold">Mensajes predeterminados</h1>
   <div id="default_tags" className={classes.content_message__tags}>
    {tags?.map(({ label, id }) => {
     const isActive = id === selectedTag;
     return (
      <h2
       key={id}
       onClick={handleSelectTag(id)}
       className={join(
        classes.content_message__template_tag,
        isActive ? classes["content_message__template_tag--active"] : ""
       )}
      >
       {label}
      </h2>
     );
    })}
   </div>
   <div className={classes.content_message__messages}>
    {tags
     ?.find(({ id }) => id === selectedTag)
     ?.messages.map((message) => (
      <div
       onClick={onSelectedMessageTemplate(message)}
       key={message.id}
       className={classes.content_message__template_message}
      >
       {transform(message.content)}
      </div>
     ))}
   </div>
  </>
 );
}
