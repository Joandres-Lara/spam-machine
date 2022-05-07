import { useState, useCallback } from "react";
import { TagModelEditable } from "@interfaces/types";

export default function LabelsEditable({
 tags = [],
}: {
 tags?: TagModelEditable[];
}) {
 const [appendTags] = useState<TagModelEditable[]>([]);
 const [removedId] = useState<number[]>([]);

 const filterRemoveTags = useCallback(
  ({ id, recient_created = false }: TagModelEditable) =>
   !recient_created && !removedId.includes(id),
  [removedId]
 );

 return (
  <>
   <h2 className="mx-3 font-bold">Etiquetas</h2>
   {tags
    .concat(appendTags)
    .filter(filterRemoveTags)
    .map(({ color, label }, i) => (
     <span key={i} style={{ backgroundColor: color }}>
      {label}
     </span>
    ))}
  </>
 );
}
