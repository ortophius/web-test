import { ReactNode } from "react";
import styles from "./tabs.module.scss";

type TabListProps = {
  children: ReactNode;
};

export const TabList = ({ children }: TabListProps) => (
  <div className={styles.tabList}>{children}</div>
);
