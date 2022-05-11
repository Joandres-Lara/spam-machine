import Form from "@components/ui/form";
import Fieldset from "@components/ui/fieldset";
import classes from "./form-sections.module.css";
import { join } from "@bot-messages/util-shared";
import { FormSectionsProps } from "./form-sections-types";
import CheckSvg from "@assets/check.svg";

export default function FormSections({
 timelapseComponentTop = null,
 sections,
 onSubmit,
 currentSectionKey,
 sectionsStates,
 currentSectionComponent,
 handleGoToSection,
}: FormSectionsProps) {
 return (
  <Form className={classes.form_sections} onSubmit={onSubmit}>
   <Fieldset className={classes.form_sections__timelapse}>
    {timelapseComponentTop}
    {sections.map(({ label, key }, i) => {
     const activated = currentSectionKey === key;
     const completed = sectionsStates.current[key].completed;

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
 );
}
