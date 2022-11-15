import styles from "./loader-layout.module.scss";
import { PulseLoader } from "react-spinners";

export const LoaderLayout = () => (
  <div className={styles.loaderLayout}>
    <PulseLoader size={5} color="#439a9a" />
  </div>
);
