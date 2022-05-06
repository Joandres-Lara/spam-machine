import Form from "@components/ui/form";
import Fieldset from "@components/ui/fieldset";
import classes from "./form-sections.module.css";
import { join } from "@bot-messages/util-shared";
import { ReactNode, useState, useCallback, useRef } from "react";
import CheckSvg from "@assets/check.svg";
import {
 useForm,
 FormProvider,
 SubmitHandler,
 FieldValues,
} from "react-hook-form";

type GoToSection = (to: string | "end" | "first" | "next") => void;

type GoToNext = () => void;

type CompleteSections = (...args: string[]) => void;

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
 timelapseComponentTop = null,
 sections,
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 onSubmit = () => {},
 defaultValues,
}: {
 sections: Section[];
 onSubmit?: SubmitHandler<FieldValues>;
 timelapseComponentTop?: ReactNode;
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 defaultValues?: any;
}) {
 const refAllValues = useRef({});
 const { handleSubmit, ...rest } = useForm({ defaultValues });
 const refSectionsStates = useRef(
  Object.fromEntries(sections.map(({ key }) => [key, { completed: false }]))
 );

 const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

 const { component: currentSectionComponent, key: currentSectionKey } =
  sections[currentSectionIndex];

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

 const setCompletes = useCallback((...completes) => {
  completes.forEach(
   (complete) => (refSectionsStates.current[complete].completed = true)
  );
 }, []) as CompleteSections;

 const handleSubmitSection = useCallback(
  (values: FieldValues) => {
   const { onValid } = sections[currentSectionIndex];
   if (onValid) {
    setCompletes(currentSectionKey);
    refAllValues.current = { ...refAllValues.current, ...values };
    onValid({ values, goTo, setCompletes, goToNext });
   } else if (currentSectionIndex === sections.length) {
    onSubmit(refAllValues.current);
   } else {
    goToNext();
   }
  },
  [
   currentSectionIndex,
   sections,
   goTo,
   setCompletes,
   goToNext,
   onSubmit,
   currentSectionKey,
  ]
 );

 const handleGoToSection = useCallback(
  (key: string) => () => goTo(key),
  [goTo]
 );

 return (
  <FormProvider {...rest} handleSubmit={handleSubmit}>
   <Form
    className={classes.form_sections}
    onSubmit={handleSubmit(handleSubmitSection)}
   >
    <Fieldset className={classes.form_sections__timelapse}>
     {timelapseComponentTop}
     {sections.map(({ label, key }, i) => {
      const activated = currentSectionKey === key;
      const completed = refSectionsStates.current[key].completed;

      if (!label) {
       return null;
      }

      return (
       <div
        onClick={handleGoToSection(key)}
        key={i}
        className={classes.form_sections__timelapse_item}
       >
        <span
         className={join(
          classes.form_sections__timelapse_indicator,
          activated
           ? classes["form_sections__timelapse_indicator--activate"]
           : "",
          completed
           ? classes["form_sections__timelapse_indicator--complete"]
           : ""
         )}
        >
         {completed && <CheckSvg />}
        </span>
        <div
         key={i}
         className={join(
          classes.form_sections__timelapse_label,
          activated ? classes["form_sections__timelapse_label--activate"] : "",
          completed ? classes["form_sections__timelapse_label--complete"] : ""
         )}
        >
         {label}
        </div>
       </div>
      );
     })}
    </Fieldset>
    <Fieldset className={classes.form_sections__body}>
     {currentSectionComponent}
    </Fieldset>
   </Form>
  </FormProvider>
 );
}
