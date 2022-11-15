import { updatePartner, UpdatePartnerPayload } from "../../../entities/partner";
import { Partner } from "../../../shared/api/@types";
import { mutatePartner } from "../../../shared/api/endpoints";
import { useAppDispatch, useUserAccess } from "../../../shared/lib/hooks";
import { Button } from "../../../shared/ui/components/button";
import { Checkbox } from "../../../shared/ui/components/checkbox";
import { ReactComponent as ArrowIcon } from "../../../shared/assets/icons/arrow.svg";
import styles from "./networks-list.module.scss";
import { format } from "date-fns";
import { Accordeon } from "../../../shared/ui/components/accordeon";
import { useState } from "react";
import { PartnerInfo } from "./partner-info";
import clsx from "clsx";

type PartnerRowProps = {
  partner: Partner;
};
export const PartnerRow = ({ partner }: PartnerRowProps) => {
  const dispatch = useAppDispatch();
  const hasAccess = useUserAccess();
  const [opened, setOpened] = useState(false);

  const handleUpdatePartner = (payload: UpdatePartnerPayload) => {
    mutatePartner(payload);
    dispatch(updatePartner(payload));
  };

  return (
    <Accordeon.Wrapper opened={opened}>
      <div className={styles.row} key={partner.id}>
        <div>
          <Button
            onClick={() => {
              setOpened(!opened);
            }}
            className={styles.expandButton}
          >
            <ArrowIcon className={clsx({ [styles.down]: opened })} />
          </Button>
        </div>
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
        <div className={styles.contacts}>{partner.contacts}</div>
      </div>
      <Accordeon.Content>
        <div className={styles.fullRow}>
          <PartnerInfo partner={partner} />
        </div>
      </Accordeon.Content>
    </Accordeon.Wrapper>
  );
};
