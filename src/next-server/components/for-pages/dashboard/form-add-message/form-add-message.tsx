import classes from "./form-add-message.module.css";
import Modal from "@components/modal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import FormSections from "@components/form-sections";
import PromptConfirmMessage from "./prompt-confirm-message";
import ContentMessage from "./content-message";
import SelectPeriocity from "./select-periocity";
import SelectWeekly from "./select-weekly";
import SelectMonth from "./select-month";
import SelectHours from "./select-hours";

export default function FormAddMessage() {
 const router = useRouter();

 return (
  <Modal
   open
   onClose={useCallback(() => {
    router.push("/dashboard");
   }, [router])}
   classNameContent={classes.modal_content}
  >
   <FormSections
    defaultValues={{
     hours: [new Date()],
    }}
    sections={[
     {
      label: "¿Cuándo?",
      component: <SelectPeriocity key="select-periocity" />,
      key: "select-periocity",
      onValid: ({ values, goToNext, goTo, setCompletes }) => {
       if (values.periocity === "inmediatly") {
        setCompletes("select-weekly", "select-hours", "select-month");
        goTo("content-message");
        return;
       }
       goToNext();
      },
     },
     {
      label: "¿A qué hora del día?",
      component: <SelectHours key="select-hours" />,
      key: "select-hours",
      onValid: ({ values, setCompletes, goTo, goToNext }) => {
       if(values.periocity === "late"){
        setCompletes("select-weekly", "select-month");
        goTo("content-message");
        return;
       }
       goToNext();
      },
     },
     {
      label: "¿Qué día de la semana?",
      component: <SelectWeekly key="select-weekly" />,
      key: "select-weekly",
     },
     {
      label: "¿Qué mes del año?",
      component: <SelectMonth key="select-month" />,
      key: "select-month",
     },
     {
      label: "¿Qué quieres que le envíemos?",
      component: <ContentMessage key="content-message" />,
      key: "content-message",
     },
     {
      label: false,
      component: <PromptConfirmMessage key="prompt-confirm-message" />,
      key: "prompt-confirm-message",
     },
    ]}
   />
  </Modal>
 );
}
