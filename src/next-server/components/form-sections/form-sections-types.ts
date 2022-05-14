import { ReactNode, MutableRefObject, FormEventHandler } from "react";
import {
 FieldValues,
 FormState,
 UseFormProps,
 UseFormReturn,
} from "react-hook-form";

export type GoToSection = (to: string | "end" | "first" | "next") => void;

export type GoToNext = () => void;

export type CompleteSections = (...args: string[]) => void;

export type ValidHandlerSection<T extends FieldValues> = (valuesAndSetter: {
 values: T;
 goTo: GoToSection;
 goToNext: GoToNext;
 setCompletes: CompleteSections;
}) => void;

export interface Section {
 label: ReactNode;
 component: ReactNode;
 key: string;
}

export interface SectionWithValidation<T extends FieldValues> extends Section {
 onValid?: ValidHandlerSection<T>;
}

export type SectionsStates = MutableRefObject<{
 [key: string]: {
  completed: boolean;
 };
}>;

export interface UseFormSectionsProps<
 TFieldValues extends FieldValues = FieldValues
> extends UseFormProps<TFieldValues> {
 sections: SectionWithValidation<Partial<TFieldValues>>[];
}

export interface UseFormSectionsReturn<
 TFieldValues extends FieldValues = FieldValues
> extends UseFormReturn<TFieldValues> {
 sections: Section[];
 currentSectionKey: string;
 sectionsStates: SectionsStates;
 currentSectionComponent: ReactNode;
 handleGoToSection: (key: string) => () => void;
 currentFormState: Pick<
  FormState<TFieldValues>,
  "isSubmitSuccessful" | "isSubmitting" | "isSubmitted"
 >;
}

export interface FormSectionsProps {
 sections: Section[];
 onSubmit: FormEventHandler;
 currentSectionKey: string;
 sectionsStates: SectionsStates;
 currentSectionComponent: ReactNode;
 handleGoToSection: (key: string) => () => void;
 timelapseComponentTop?: ReactNode;
}
