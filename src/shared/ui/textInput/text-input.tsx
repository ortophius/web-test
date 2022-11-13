import clsx from "clsx";
import { AllHTMLAttributes } from "react";
import styles from "./text-input.module.scss";

type TextInputProps = {
  error?: boolean;
  required?: boolean;
} & AllHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ error, ...rest }: TextInputProps) => (
  <input className={clsx({ [styles.error]: error })} type="text" {...rest} />
);
