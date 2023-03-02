import { RegisterOptions } from "react-hook-form";

export type ControlType =
  | "text"
  | "select"
  | "multi-select"
  | "number"
  | "checkbox"
  | "file"
  | "phoneNumber"
  | "email"
  | "url";

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomFieldData {
  label: string;
  inputType: ControlType;
  fieldName: string;
  defaultValue: any;
  options?: SelectOption[];
  config?: RegisterOptions;
}
