import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./accordeon.module.scss";

type WrapperProps = {
  opened: boolean;
  children: ReactNode;
};

export const Wrapper = ({ opened, children }: WrapperProps) => (
  <div className={clsx(styles.wrapper, { [styles.open]: opened })}>
    {children}
  </div>
);
