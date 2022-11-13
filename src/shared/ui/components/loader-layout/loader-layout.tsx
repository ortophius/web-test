import styles from "./loader-layout.module.scss";
import { GridLoader } from "react-spinners";

export const LoaderLayout = () => (
  <div className={styles.loaderLayout}>
    <GridLoader size={5} color="#439a9a" />
  </div>
);
