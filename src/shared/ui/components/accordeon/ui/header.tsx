import { ReactNode } from "react";
import styles from "./accordeon.module.scss";

type HeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: HeaderProps) => (
  <div className={styles.header} role="presentation">
    {children}
  </div>
);
