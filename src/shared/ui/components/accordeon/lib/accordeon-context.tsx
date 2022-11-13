import { createContext, useContext } from "react";

const AccordeonContext = createContext(false);

export const { Provider } = AccordeonContext;

export const useAccordeonContext = () => useContext(AccordeonContext);
