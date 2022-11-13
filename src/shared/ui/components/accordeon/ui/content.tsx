import { ReactNode } from "react";
import styles from "./accordeon.module.scss";

type ContentProps = {
  children: ReactNode;
};

export const Content = ({ children }: ContentProps) => (
  <div className={styles.content}>{children}</div>
);
