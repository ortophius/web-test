import { changeUserRole, useUserSelector } from "..";
import { UserRoles } from "../types";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { Switch } from "../../../shared/ui/components/switch";

export const UserRoleSwitch = () => {
  const { role } = useUserSelector();
  const dispatch = useAppDispatch();

  const handleChange = (value: boolean) => {
    dispatch(changeUserRole(value ? UserRoles.admin : UserRoles.manager));
  };

  return (
    <Switch
      value={role === UserRoles.admin}
      onChange={handleChange}
      labels={{
        leftLabel: "Manager",
        rightLabel: "Admin",
      }}
    />
  );
};
