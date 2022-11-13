import { AllHTMLAttributes } from "react";
import styles from "./select.module.scss";

type SelectProps = {
  options: string[];
  value: string;
} & AllHTMLAttributes<HTMLSelectElement>;

export const Select = ({ options, value, ...rest }: SelectProps) => (
  <select className={styles.select} value={value} {...rest}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
