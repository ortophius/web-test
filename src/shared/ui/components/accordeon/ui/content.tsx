import { ReactNode } from "react";
import { useAccordeonContext } from "../lib/accordeon-context";

type ContentProps = {
  children: ReactNode;
};

export const Content = ({ children }: ContentProps) => {
  const opened = useAccordeonContext();

  return opened ? <>{children}</> : null;
};
