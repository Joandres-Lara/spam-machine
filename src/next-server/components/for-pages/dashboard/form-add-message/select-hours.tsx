import { useCallback, Fragment, useState, useEffect } from "react";
import { FieldSet, Legend, Button } from "@components/ui";
import { useFormContext, useFieldArray } from "react-hook-form";
import WheelableAndEditableTime from "./wheelable-and-editable-time";
import { normalizeChunk, templateHour } from "@lib/util-hour";
import {
 setHours as helperSetHoursDateFn,
 setMinutes as helperSetMinutesDateFn,
 setSeconds as helperSetSecondsDateFn,
} from "date-fns";

export default function SelectHours() {
 const { register, setValue, control } = useFormContext();
 // In the future can be add more hours
 const { fields } = useFieldArray({ control, name: "hours" });
 const [currentDate, setCurrentDate] = useState(new Date());

 const setHours = useCallback(
  (hours: number) =>
   setCurrentDate((prev) => helperSetHoursDateFn(prev, hours)),
  []
 );

 const setMinutes = useCallback(
  (minutes: number) =>
   setCurrentDate((prev) => helperSetMinutesDateFn(prev, minutes)),
  []
 );

 const setSeconds = useCallback(
  (seconds: number) =>
   setCurrentDate((prev) => helperSetSecondsDateFn(prev, seconds)),
  []
 );

 const moreHours = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetHoursDateFn(prev, prev.getHours() === 23 ? 0 : prev.getHours() + 1)
   ),
  []
 );

 const minusHours = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetHoursDateFn(prev, prev.getHours() === 0 ? 23 : prev.getHours() - 1)
   ),
  []
 );

 const moreMinutes = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetMinutesDateFn(
     prev,
     prev.getMinutes() === 59 ? 0 : prev.getMinutes() + 1
    )
   ),
  []
 );

 const minusMinutes = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetMinutesDateFn(
     prev,
     prev.getMinutes() === 0 ? 59 : prev.getMinutes() - 1
    )
   ),
  []
 );

 const moreSeconds = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetSecondsDateFn(
     prev,
     prev.getSeconds() === 59 ? 0 : prev.getSeconds() + 1
    )
   ),
  []
 );

 const minusSeconds = useCallback(
  () =>
   setCurrentDate((prev) =>
    helperSetSecondsDateFn(
     prev,
     prev.getSeconds() === 0 ? 59 : prev.getSeconds() - 1
    )
   ),
  []
 );

 const am_or_pm = currentDate.getHours() >= 12 ? "pm" : "am";

 useEffect(() => {
  setValue("hours.0", templateHour(currentDate));
 }, [currentDate, setValue]);

 return (
  <>
   <Legend variant="md">
    Selecciona una hora del día con la rueda del ratón o ingresa directamente la
    hora.
   </Legend>
   <FieldSet className="text-center text-6xl">
    {/* TODO: In the future can be add more hours */}
    {fields.map((field, index) => (
     <Fragment key={field.id}>
      <WheelableAndEditableTime
       onValid={(content) =>
        Number.parseInt(content) >= 0 && Number.parseInt(content) < 24
       }
       onBlur={(content) => setHours(Number.parseInt(content))}
       onUp={moreHours}
       onDown={minusHours}
      >
       {normalizeChunk(currentDate.getHours())}
      </WheelableAndEditableTime>
      {":"}
      <WheelableAndEditableTime
       onValid={(content) =>
        Number.parseInt(content) >= 0 && Number.parseInt(content) < 60
       }
       onBlur={(content) => setMinutes(Number.parseInt(content))}
       onUp={moreMinutes}
       onDown={minusMinutes}
      >
       {normalizeChunk(currentDate.getMinutes())}
      </WheelableAndEditableTime>
      {":"}
      <WheelableAndEditableTime
       onValid={(content) =>
        Number.parseInt(content) >= 0 && Number.parseInt(content) < 60
       }
       onBlur={(content) => setSeconds(Number.parseInt(content))}
       onUp={moreSeconds}
       onDown={minusSeconds}
      >
       {normalizeChunk(currentDate.getSeconds())}
      </WheelableAndEditableTime>{" "}
      {am_or_pm}
      <input {...register(`hours.${index}`)} type="hidden" />
     </Fragment>
    ))}
   </FieldSet>
   <FieldSet flex className="flex-row-reverse">
    <Button variant="highlight">Siguiente</Button>
   </FieldSet>
  </>
 );
}
