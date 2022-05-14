import { Button } from "@components/ui";
import { useState, useCallback, useMemo } from "react";
import DefaultMessages from "./default-messages";
import LabelsEditable from "./labels-editable";
import { MessageTags, TagModelEditable } from "@interfaces/types";
import Fieldset from "@components/ui/fieldset";
import TextAreaContentMessage from "./textarea-content-message";

export default function ContentMessage() {
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

 return (
  <>
   <div className="flex flex-row flex-wrap items-center my-2">
    <h1 className="font-bold">Contenido</h1>
    <LabelsEditable
     tags={memoizeTags}
     selectedMessageTemplate={selectedMessageTemplate}
     onUpdateTags={setSelectedMessageTemplate}
    />
   </div>
   <TextAreaContentMessage
    selectedMessageTemplate={selectedMessageTemplate}
    onCreateMessageTemplate={setSelectedMessageTemplate}
   />
   <DefaultMessages
    onSelectedMessageTemplate={handleSelectedMessageTemplate}
   />
   <Fieldset flex className="flex-row-reverse">
    <Button variant="highlight">Guardar</Button>
   </Fieldset>
  </>
 );
}
