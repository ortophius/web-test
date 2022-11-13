import styles from "./networks-list.module.scss";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextInput } from "../../../shared/ui/textInput";
import { Segments } from "../../../shared/api/@types";
import { Select } from "../../../shared/ui/components/select";
import { Checkbox } from "../../../shared/ui/components/checkbox";
import { DateInput } from "../../../shared/ui/components/date-input";
import { useState } from "react";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { createPartner } from "../../../entities/partner/model";
import clsx from "clsx";
import { PulseLoader } from "react-spinners";

type FormValues = {
  name: string;
  segment: Segments;
  approved: boolean;
  accredited: boolean;
  startDate: string;
  contacts: string;
  blocked: boolean;
};

type PartnerFormProps = {
  networkId: string;
};

export const PartnerForm = ({ networkId }: PartnerFormProps) => {
  const [savePending, setSavePending] = useState(false);
  const dispatch = useAppDispatch();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      segment: Segments.IT,
      approved: false,
      accredited: false,
      startDate: new Date().toISOString(),
      contacts: "",
      blocked: true,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSavePending(true);
    await dispatch(createPartner({ networkId, ...data }));
    setSavePending(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(styles.row, styles.partnersForm)}>
        {savePending && (
          <div className={styles.loader}>
            <PulseLoader size={7} color="#439a9a" />
          </div>
        )}
        <div>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextInput error={!!error} value={value} onChange={onChange} />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="segment"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                options={Object.values(Segments)}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="approved"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Checkbox value={value} onChange={onChange} />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="accredited"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Checkbox value={value} onChange={onChange} />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="startDate"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateInput value={value} onChange={onChange} />
            )}
          />
        </div>
        <div>
          <Controller
            control={control}
            name="blocked"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Checkbox value={value} onChange={onChange} />
            )}
          />
        </div>
        <div>
          <div className={styles.flexCell}>
            <Controller
              control={control}
              name="contacts"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextInput error={!!error} value={value} onChange={onChange} />
              )}
            />
            <input className={styles.submit} type="submit" value="✓" />
          </div>
        </div>
      </div>
    </form>
  );
};
