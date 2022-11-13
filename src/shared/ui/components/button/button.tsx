import clsx from "clsx";
import { AllHTMLAttributes, PropsWithChildren } from "react";
import styles from "./button.module.scss";

export const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<Omit<AllHTMLAttributes<HTMLButtonElement>, "type">>) => (
  <button {...rest} className={clsx(styles.button, className)}>
    {children}
  </button>
);
