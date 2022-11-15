import { format } from "date-fns";
import { useState } from "react";
import { updateNetwork } from "../../../entities/network";
import { Network } from "../../../shared/api/@types";
import { useAppDispatch, useUserAccess } from "../../../shared/lib/hooks";
import { Accordeon } from "../../../shared/ui/components/accordeon";
import { Button } from "../../../shared/ui/components/button";
import { NetworkPartners } from "./network-partners";
import { ReactComponent as ArrowIcon } from "../../../shared/assets/icons/arrow.svg";
import { ReactComponent as BinIcon } from "../../../shared/assets/icons/bin.svg";

import styles from "./networks-list.module.scss";
import clsx from "clsx";
import { Switch } from "../../../shared/ui/components/switch";

const a = <ArrowIcon />;

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
      <div className={styles.row}>
        <div>
          <Button
            onClick={() => {
              setOpened(!opened);
            }}
            className={styles.expandButton}
          >
            <ArrowIcon className={clsx({ [styles.arrowDown]: opened })} />
          </Button>
        </div>
        <div className={styles.cell}>{name}</div>
        <div className={styles.cell}>
          {format(new Date(startDate), "dd.MM.yyyy")}
        </div>
        <div className={styles.cell}>
          <Switch
            value={blocked}
            onChange={() => {
              dispatch(updateNetwork({ id, blocked: !blocked }));
            }}
            disabled={!hasAccess}
          />
        </div>
        <div>
          <Button onClick={() => {}} className={styles.binButton}>
            <BinIcon />
          </Button>
        </div>
      </div>
      <Accordeon.Content>
        <div className={styles.partners}>
          {opened && <NetworkPartners id={id} />}
        </div>
      </Accordeon.Content>
    </Accordeon.Wrapper>
  );
};
