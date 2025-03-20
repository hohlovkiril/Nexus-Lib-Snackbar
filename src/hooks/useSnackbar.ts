import { createContext, useContext } from "react";
import { SnackbarItemOptions } from "common";

export interface ISnackbarContext {
  enqueueSnackbar: (message: string, options?: SnackbarItemOptions) => void;
  closeSnackbar: (id: number) => void;
}

export const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);

export const useSnackbar = (): ISnackbarContext => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar hook must be wrapped in SnackbarProvider');
  }

  return context;
}