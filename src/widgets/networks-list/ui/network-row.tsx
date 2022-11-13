import { format } from "date-fns";
import { useState } from "react";
import { updateNetwork } from "../../../entities/network";
import { Network } from "../../../shared/api/@types";
import { useAppDispatch, useUserAccess } from "../../../shared/lib/hooks";
import { Accordeon } from "../../../shared/ui/components/accordeon";
import { Button } from "../../../shared/ui/components/button";
import { Checkbox } from "../../../shared/ui/components/checkbox";
import { NetworkPartners } from "./network-partners";
import styles from "./networks-list.module.scss";

type NetworkRowProps = Network;

export const NetworkRow = ({
  id,
  name,
  startDate,
  blocked,
}: NetworkRowProps) => {
  const [opened, setOpened] = useState(false);
  const dispatch = useAppDispatch();
  const hasAccess = useUserAccess();

  return (
    <Accordeon.Wrapper opened={opened}>
      <Accordeon.Header>
        <div className={styles.row} role="presentation">
          <div>
            <Button
              onClick={() => {
                setOpened(!opened);
              }}
            >
              {opened ? "↓" : "↑"}
            </Button>
          </div>
          <div className={styles.cell}>{name}</div>
          <div className={styles.cell}>
            {format(new Date(startDate), "dd.MM.yyyy")}
          </div>
          <div className={styles.cell}>
            <Checkbox
              value={blocked}
              onChange={() => {
                dispatch(updateNetwork({ id, blocked: !blocked }));
              }}
              disabled={!hasAccess}
            />
          </div>
        </div>
      </Accordeon.Header>
      <Accordeon.Content>
        <div className={styles.partners}>
          {opened && <NetworkPartners id={id} />}
        </div>
      </Accordeon.Content>
    </Accordeon.Wrapper>
  );
};
