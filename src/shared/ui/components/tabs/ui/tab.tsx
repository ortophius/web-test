import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./tabs.module.scss";

type TabProps = {
  children: ReactNode;
  active?: boolean;
};

export const Tab = ({ children, active = false }: TabProps) => (
  <div className={clsx(styles.tab, { [styles.activeTab]: active })}>
    {children}
  </div>
);
