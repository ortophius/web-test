import clsx from "clsx";
import { format } from "date-fns";
import { updatePartner, UpdatePartnerPayload } from "../../../entities/partner";
import { Partner } from "../../../shared/api/@types";
import { mutatePartner } from "../../../shared/api/endpoints";
import { useAppDispatch, useUserAccess } from "../../../shared/lib/hooks";
import { Checkbox } from "../../../shared/ui/components/checkbox";
import { Tab, Tabs } from "../../../shared/ui/components/tabs";
import styles from "./networks-list.module.scss";

type PartnerInfoProps = {
  partner: Partner;
};

export const PartnerInfo = ({ partner }: PartnerInfoProps) => {
  const dispatch = useAppDispatch();
  const hasAccess = useUserAccess();

  const handleUpdatePartner = (payload: UpdatePartnerPayload) => {
    mutatePartner(payload);
    dispatch(updatePartner(payload));
  };

  return (
    <div>
      <Tabs>
        <Tab active>Информация</Tab>
        <Tab>Мониторинг</Tab>
        <Tab>Заметки</Tab>
      </Tabs>
      <div className={clsx(styles.partnerInfoGrid, styles.grid)}>
        <div className={clsx(styles.gridHeader, styles.row)}>
          <div>Партнёр</div>
          <div>Сегмент</div>
          <div>Подтверждён</div>
          <div>Аккредитован</div>
          <div>Дата включения в сеть</div>
          <div>Заблокирован</div>
          <div>Контакты</div>
        </div>
        <div className={styles.row}>
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
      </div>
    </div>
  );
};
