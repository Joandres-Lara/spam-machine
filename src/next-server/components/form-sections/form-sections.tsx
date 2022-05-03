import Form from "@components/ui/form";
import Fieldset from "@components/ui/fieldset";
import classes from "./form-section.module.css";
import { join } from "@bot-messages/util-shared";
import { ReactNode, useState, useCallback, useRef } from "react";
import {
 useForm,
 FormProvider,
 SubmitHandler,
 FieldValues,
} from "react-hook-form";

type GoToSection = (to: string | "end" | "first" | "next") => void;

type GoToNext = () => void;

type CompleteSections = (...args: [key: string, value: unknown][]) => void;

type ValidHandlerSection = (valuesAndSetter: {
 values: FieldValues;
 goTo: GoToSection;
 goToNext: GoToNext;
 setCompletes: CompleteSections;
}) => void;

type Section = {
 label: ReactNode;
 component: ReactNode;
 onValid?: ValidHandlerSection;
 key: string;
};

export default function FormSections({
 sections,
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 onSubmit = () => {},
}: {
 sections: Section[];
 onSubmit?: SubmitHandler<FieldValues>;
}) {
 const refAllValues = useRef({});
 const { handleSubmit, ...rest } = useForm();
 const refSectionsStates = useRef(
  Object.fromEntries(sections.map(({ key }) => [key, { completed: false }]))
 );

 const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

 const goTo = useCallback(
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
 ) as GoToSection;

 const goToNext = useCallback(() => {
  goTo("next");
 }, [goTo]);

 const setCompletes = useCallback((...args) => {}, []) as CompleteSections;

 const handleSubmitSection = useCallback(
  (values: FieldValues) => {
   const { onValid } = sections[currentSectionIndex];
   if (onValid) {
    refAllValues.current = { ...refAllValues.current, ...values };
    onValid({ values, goTo, setCompletes, goToNext });
   } else if (currentSectionIndex === sections.length) {
    console.log({ refAllValues });
    onSubmit(refAllValues.current);
   } else {
    goToNext();
   }
  },
  [currentSectionIndex, sections, goTo, setCompletes, goToNext, onSubmit]
 );

 const handleGoToSection = useCallback(
  (key: string) => () => goTo(key),
  [goTo]
 );

 const { component: currentSectionComponent, key: currentSectionKey } =
  sections[currentSectionIndex];

 return (
  <FormProvider {...rest} handleSubmit={handleSubmit}>
   <Form onSubmit={handleSubmit(handleSubmitSection)}>
    <Fieldset>
     {sections.map(({ label, key }, i) => (
      <div
       onClick={handleGoToSection(key)}
       key={i}
       className={join(
        classes.form_section__timelapse_label,
        currentSectionKey === key
         ? classes["form_section__timelapse_label--activate"]
         : "",
        refSectionsStates.current[key].completed
         ? classes["form_section__timelapse_label--complete"]
         : ""
       )}
      >
       {label}
      </div>
     ))}
    </Fieldset>
    <Fieldset>{currentSectionComponent}</Fieldset>
   </Form>
  </FormProvider>
 );
}
