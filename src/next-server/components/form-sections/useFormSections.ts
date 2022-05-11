import { useRef, useState, useCallback } from "react";
import {
 UseFormSectionsProps,
 UseFormSectionsReturn,
 GoToSection,
 CompleteSections,
} from "./form-sections-types";
import { FieldValues, useForm, UseFormHandleSubmit } from "react-hook-form";

export default function useFormSections<
 TFieldValues extends FieldValues = FieldValues
>({
 sections,
 ...restProps
}: UseFormSectionsProps<TFieldValues>): UseFormSectionsReturn<TFieldValues> {
 const { handleSubmit, ...restUseForm } = useForm<TFieldValues>(restProps);

 const refSectionsStates = useRef(
  Object.fromEntries(sections.map(({ key }) => [key, { completed: false }]))
 );

 const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

 const { component: currentSectionComponent, key: currentSectionKey } =
  sections[currentSectionIndex];

 const goTo: GoToSection = useCallback(
  (to) => {
   if (to === "end") {
    setCurrentSectionIndex(sections.length - 1);
   } else if (to === "first") {
    setCurrentSectionIndex(0);
   } else if (to === "next") {
    setCurrentSectionIndex((i) => i + 1);
   } else {
    setCurrentSectionIndex(
     sections.findIndex(({ key: sectionKey }) => sectionKey === to)
    );
   }
  },
  [sections]
 );

 const goToNext = useCallback(() => {
  goTo("next");
 }, [goTo]);

 const setCompletes: CompleteSections = useCallback(
  (...completes: string[]) => {
   completes.forEach(
    (complete) => (refSectionsStates.current[complete].completed = true)
   );
  },
  []
 );

 const handleGoToSection = useCallback(
  (key: string) => () => goTo(key),
  [goTo]
 );

 const handleSubmitSections: UseFormHandleSubmit<TFieldValues> = useCallback(
  (onSubmit) => {
   return handleSubmit((values) => {
    const { onValid } = sections[currentSectionIndex];
    if (onValid) {
     setCompletes(currentSectionKey);
     onValid({ values, goTo, setCompletes, goToNext });
    } else if (currentSectionIndex === sections.length - 1) {
     onSubmit(values);
    } else {
     setCompletes(currentSectionKey);
     goToNext();
    }
   });
  },
  [
   currentSectionIndex,
   currentSectionKey,
   sections,
   handleSubmit,
   setCompletes,
   goToNext,
   goTo,
  ]
 );

 return {
  ...restUseForm,
  handleSubmit: handleSubmitSections,
  sections,
  currentSectionComponent,
  currentSectionKey,
  handleGoToSection,
  sectionsStates: refSectionsStates,
 };
}
