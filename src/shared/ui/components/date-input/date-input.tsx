import { format } from "date-fns";
import { AllHTMLAttributes } from "react";

type DateProps = {
  value: string; // Date-readable
} & AllHTMLAttributes<HTMLInputElement>;

export const DateInput = ({ value, ...rest }: DateProps) => (
  <input type="date" {...rest} value={format(new Date(value), "yyyy-MM-dd")} />
);
