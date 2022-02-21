import { createContext, useContext } from 'react';
import { Year } from '../models/year';

const YearContext = createContext<Year>({} as Year);

export const PageContextProvider: React.FC<Year> = ({ children, ...year }) => {
  return <YearContext.Provider value={year}>{children}</YearContext.Provider>;
};

export function useAppContext() {
  return useContext(YearContext);
}
