import { AllHTMLAttributes, useRef } from "react";
import styles from "./switch.module.scss";

type LabelProps = Omit<AllHTMLAttributes<HTMLButtonElement>, "type">;

type SwitchProps = Omit<
  AllHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  value: boolean;
  labels?: {
    leftLabel: string;
    rightLabel: string;
  };
  onChange: (value: boolean) => void;
};

const SwitchButton = ({ children, ...rest }: LabelProps) => (
  <button className={styles.switchLabel} {...rest}>
    {children}
  </button>
);

export const Switch = ({ labels, onChange, value, ...rest }: SwitchProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      {labels && (
        <SwitchButton onClick={() => onChange(false)}>
          {labels.leftLabel}
        </SwitchButton>
      )}
      <label className={styles.switch}>
        <input
          type="checkbox"
          {...rest}
          className={styles.checkbox}
          ref={checkboxRef}
          checked={value}
          onChange={() => onChange(!value)}
        />
        <span className={styles.slider} />
      </label>
      {labels && (
        <SwitchButton onClick={() => onChange(true)}>
          {labels.rightLabel}
        </SwitchButton>
      )}
    </div>
  );
};
