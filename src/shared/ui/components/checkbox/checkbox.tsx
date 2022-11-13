import { AllHTMLAttributes } from "react";
import styles from "./checkbox.module.scss";

type CheckboxProps = Omit<
  AllHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox = ({
  label,
  value,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        {...rest}
        className={styles.input}
        checked={value}
        onChange={() => {
          onChange(!value);
        }}
      />
      {label}
      <span className={styles.checkboxImage} />
    </label>
  );
};
