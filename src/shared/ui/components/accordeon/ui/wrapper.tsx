import { ReactNode } from "react";
import { Provider } from "../lib/accordeon-context";

type WrapperProps = {
  opened: boolean;
  children: ReactNode;
};

export const Wrapper = ({ opened, children }: WrapperProps) => (
  <Provider value={opened}>{children}</Provider>
);
