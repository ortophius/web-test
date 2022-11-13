import clsx from "clsx";
import {
  fetchAllNetworks,
  useNetworksSelector,
} from "../../../entities/network";
import { useInitialThunk } from "../../../shared/lib/hooks";
import { LoaderLayout } from "../../../shared/ui/components/loader-layout";
import { NetworkRow } from "./network-row";
import styles from "./networks-list.module.scss";

export const NetworksList = () => {
  const pending = useInitialThunk(fetchAllNetworks);
  const networks = useNetworksSelector();

  return (
    <div className={styles.networks}>
      <div className={styles.grid}>
        <div className={clsx(styles.row, styles.gridHeader)}>
          <div></div>
          <div>Наименование сети</div>
          <div>Дата регистрации</div>
          <div>Блокировка</div>
        </div>
        {pending ? (
          <LoaderLayout />
        ) : (
          networks.map((network) => (
            <NetworkRow key={network.id} {...network} />
          ))
        )}
      </div>
    </div>
  );
};
