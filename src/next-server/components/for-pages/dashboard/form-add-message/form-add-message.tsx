import Modal from "@components/modal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import FormSections from "@components/form-sections";
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
  >
   <FormSections
    sections={[
     {
      label: "¿Cuándo?",
      component: <SelectPeriocity key="select-periocity" />,
      key: "select-periocity",
      onValid: ({ values, goToNext }) => {
       console.log({values});
       if (values.periocity === "only-one-use") {
        // setCompletes(
        //  ["select-weekly", null],
        //  ["select-hours", null],
        //  ["select-month", null]
        // );
        // goTo("end");
       }
       goToNext();
      },
     },
     {
      label: "Día de la semana",
      component: <SelectWeekly key="select-weekly" />,
      key: "select-weekly",
     },
     {
      label: "Hora del día",
      component: <SelectHours key="select-hours" />,
      key: "select-hours",
     },
     {
      label: "Mes del año",
      component: <SelectMonth key="select-month" />,
      key: "select-month",
     },
    ]}
   />
  </Modal>
 );
}
