import { TextArea } from "@components/ui";
import useTagsMessages from "@hooks/useTagsMessages";
import { join } from "@bot-messages/util-shared";
import { Fragment, useState } from "react";

export default function ContentMessage() {
 const { tags } = useTagsMessages();
 const [selectedTag] = useState(1);

 return (
  <>
   <TextArea
    placeholder="Escribe aquí, o selecciona un mensaje predeterminado desde más abajo..."
    rows={8}
    cols={60}
   />
   <h1 className="font-bold">Mensajes predeterminados</h1>
   {tags?.map(({ label, messages, id }, i) => {
    const isActive = id === selectedTag;
    return (
     <Fragment key={i}>
      <h2 className={join("inline-block", isActive ? "active" : "")}>
       {label}
      </h2>
      <div>
       {isActive &&
        messages.map(({ content }, j) => <div key={j}>{content.text}</div>)}
      </div>
     </Fragment>
    );
   })}
  </>
 );
}
