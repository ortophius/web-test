import {
  fetchPartnersByNetworkId,
  usePartnerSelectorByNetworkId,
} from "../../../entities/partner";
import { Network } from "../../../shared/api/@types";
import { useInitialThunk, useUserAccess } from "../../../shared/lib/hooks";
import styles from "./networks-list.module.scss";
import { PartnerForm } from "./partnerForm";
import clsx from "clsx";
import { LoaderLayout } from "../../../shared/ui/components/loader-layout";
import { Button } from "../../../shared/ui/components/button";
import { PartnerRow } from "./partner-row";
import { useState } from "react";
import { Tab, Tabs } from "../../../shared/ui/components/tabs";
import { ReactComponent as PlusIcon } from "../../../shared/assets/icons/plus.svg";

type NetworkPartnersProps = {
  id: Network["id"];
};

export const NetworkPartners = ({ id }: NetworkPartnersProps) => {
  const [editMode, setEditMode] = useState(false);
  const pending = useInitialThunk(fetchPartnersByNetworkId, id);
  const partners = usePartnerSelectorByNetworkId(id);
  const hasAccess = useUserAccess();

  return pending ? (
    <LoaderLayout />
  ) : (
    <div>
      <Tabs>
        <Tab>Сегменты</Tab>
        <Tab active>Партнёры</Tab>
        <Tab>Сотрудники</Tab>
        <Tab>Проекты</Tab>
        <Tab>Потребности</Tab>
        <Tab>Статистика</Tab>
      </Tabs>
      <div className={clsx(styles.grid, styles.partnersGrid)}>
        <div className={clsx(styles.row, styles.gridHeader)}>
          <div />
          <div>Партнёр</div>
          <div>Сегмент</div>
          <div>Подтверждён</div>
          <div>Аккредитован</div>
          <div>Дата включения в сеть</div>
          <div>Заблокирован</div>
          <div>Контакты</div>
        </div>
        {partners.map((partner) => (
          <PartnerRow partner={partner} />
        ))}
        {editMode && hasAccess && (
          <div className={styles.row}>
            <PartnerForm networkId={id} />
          </div>
        )}
      </div>
      {!editMode && hasAccess && (
        <Button
          className={styles.addButton}
          onClick={() => {
            setEditMode(true);
          }}
        >
          <PlusIcon />
          Добавить партнёра
        </Button>
      )}
    </div>
  );
};
