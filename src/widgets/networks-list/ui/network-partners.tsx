import { useState } from "react";
import {
  fetchPartnersByNetworkId,
  updatePartner,
  UpdatePartnerPayload,
  usePartnerSelectorByNetworkId,
} from "../../../entities/partner";
import { Network } from "../../../shared/api/@types";
import {
  useAppDispatch,
  useInitialThunk,
  useUserAccess,
} from "../../../shared/lib/hooks";
import styles from "./networks-list.module.scss";
import { Checkbox } from "../../../shared/ui/components/checkbox";
import { format } from "date-fns";
import { mutatePartner } from "../../../shared/api/endpoints";
import { PartnerForm } from "./partnerForm";
import clsx from "clsx";
import { LoaderLayout } from "../../../shared/ui/components/loader-layout";
import { Button } from "../../../shared/ui/components/button";

type NetworkPartnersProps = {
  id: Network["id"];
};

export const NetworkPartners = ({ id }: NetworkPartnersProps) => {
  const [editMode, setEditMode] = useState(false);
  const pending = useInitialThunk(fetchPartnersByNetworkId, id);
  const partners = usePartnerSelectorByNetworkId(id);
  const dispatch = useAppDispatch();
  const hasAccess = useUserAccess();

  const handleUpdatePartner = (payload: UpdatePartnerPayload) => {
    mutatePartner(payload);
    dispatch(updatePartner(payload));
  };

  return pending ? (
    <LoaderLayout />
  ) : (
    <div className={styles.partnersGrid}>
      <div className={clsx(styles.row, styles.gridHeader)}>
        <div>Партнёр</div>
        <div>Сегмент</div>
        <div>Подтверждён</div>
        <div>Аккредитован</div>
        <div>Дата включения в сеть</div>
        <div>Заблокирован</div>
        <div>Контакты</div>
      </div>
      {partners.map((partner) => (
        <div className={styles.row} key={partner.id}>
          <div>{partner.name}</div>
          <div>{partner.segment}</div>
          <div>
            <Checkbox
              value={partner.approved}
              onChange={() => {
                handleUpdatePartner({
                  id: partner.id,
                  approved: !partner.approved,
                });
              }}
              disabled={!hasAccess}
            />
          </div>
          <div>
            <Checkbox
              value={partner.accredited}
              onChange={() => {
                handleUpdatePartner({
                  id: partner.id,
                  accredited: !partner.accredited,
                });
              }}
              disabled={!hasAccess}
            />
          </div>
          <div>{format(new Date(partner.startDate), "dd.MM.yyyy")}</div>
          <div>
            <Checkbox
              value={partner.blocked}
              onChange={() => {
                handleUpdatePartner({
                  id: partner.id,
                  blocked: !partner.blocked,
                });
              }}
              disabled={!hasAccess}
            />
          </div>
          <div>{partner.contacts}</div>
        </div>
      ))}
      {editMode && hasAccess && <PartnerForm networkId={id} />}
      {!editMode && (
        <Button
          className={styles.addButton}
          onClick={() => {
            setEditMode(true);
          }}
          disabled={!hasAccess}
        >
          Добавить
        </Button>
      )}
    </div>
  );
};
