import classes from "./form-add-message.module.css";
import Modal from "@components/modal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import FormSections from "@components/form-sections";
import { useForm, FieldValues } from "react-hook-form";
import PromptConfirmMessage from "./prompt-confirm-message";
import ContentMessage from "./content-message";
import SelectPeriocity from "./select-periocity";
import SelectWeeklyDay from "./select-weekly-day";
import SelectMonth from "./select-month";
import SelectHours from "./select-hours";

export default function FormAddMessage() {
 const router = useRouter();
 const formMethods = useForm<FieldValues>({
  defaultValues: {
   hours: ["00:00:00"]
  }
 });

 return (
  <Modal
   open
   onClose={useCallback(() => {
    router.push("/dashboard");
   }, [router])}
   classNameContent={classes.modal_content}
  >
   <FormSections
    formMethods={formMethods}
    sections={[
     {
      label: "¿Cuándo?",
      component: <SelectPeriocity key="select-periocity" />,
      key: "select-periocity",
      onValid({ values, goToNext, goTo, setCompletes }) {
       const periocity = values.periocity;
       if (periocity === "inmediatly") {
        setCompletes("select-weekly-day", "select-hours", "select-month");
        goTo("content-message");
        return;
       } else if (periocity === "weekly") {
        setCompletes("select-month");
       }
       goToNext();
      },
     },
     {
      label: "¿A qué hora del día?",
      component: <SelectHours key="select-hours" />,
      key: "select-hours",
      onValid({ values, setCompletes, goTo, goToNext }) {
       if (values.periocity === "late") {
        setCompletes("select-weekly-day", "select-month");
        goTo("content-message");
        return;
       }
       goToNext();
      },
     },
     {
      label: "¿Qué día de la semana?",
      component: <SelectWeeklyDay key="select-weekly-day" />,
      key: "select-weekly-day",
      onValid({ values, goToNext, goTo, setCompletes }) {
       if (values.periocity === "weekly") {
        setCompletes("select-month");
        goTo("content-message");
        return;
       }
       goToNext();
      },
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
