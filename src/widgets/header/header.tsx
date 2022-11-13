import { UserRoleSwitch } from "../../entities/user";
import styles from "./header.module.scss";

export const Header = () => (
  <header className={styles.header}>
    <UserRoleSwitch />
  </header>
);
