import { useCallback, useMemo, useRef, useState } from "react";
import { Reason, SnackbarItem, SnackbarItemOptions } from "../common";

export interface SnackbarApi {
  stack: SnackbarItem[];
  enqueueSnackbar: (message: string, options?: SnackbarItemOptions) => void;
  closeSnackbar: (id: number, reason: Reason) => void;
}

export const useSnackbarApi = (): SnackbarApi => {
  const [state, setState] = useState<SnackbarItem[]>([]);

  const handleUpdateClass = useCallback((id: number, newClasses: string[], reload?: true) => {
    setState(prev => {
      return prev.map((item) => ({
        ...item,
        className: item.id === id
          ? newClasses.join(' ') : item.className,
      }));
    })
  }, [])

  const handleRemoveSnackbar = useCallback((id: number) => {
    setState(prev => {
      return prev.filter((item) => item.id !== id);
    })
  }, [])

  const handlerCloseSnackbar = useCallback((id: number, reason: Reason) => {    
    setState(prev => {
      setTimeout(() => {
        handleRemoveSnackbar(id);
      }, 250)
      return prev.map((item) => ({
        ...item,
        className: item.id === id && !item.className.includes('hidden')
          ? `AnimEnd-${item.position}` : item.className
      }))
    })
  }, [
    handleRemoveSnackbar
  ])

  const handleEnqueueSnackbar = useCallback((message: string, options?: SnackbarItemOptions) => {
    const id = new Date().getTime();
    const newSnackItem: SnackbarItem = {
      id,
      className: `AnimStart-${options.position || 'bottom-end'}`,
      position: options.position || 'bottom-end',
      message,
      createdTimestamp: id,
      autoHideDuration: options.autoHideDuration ? options.autoHideDuration + 1000 : 5000,
      actions: options.actions,
    };

    setTimeout(() => {
      handleUpdateClass(id, [''])
    }, 250)

    setTimeout(() => {
      handlerCloseSnackbar(id, 'autoClose');
    }, newSnackItem.autoHideDuration - 500)

    setState(prev => {
      return [...prev, newSnackItem];
    })
  }, [
    handleRemoveSnackbar,
    handlerCloseSnackbar,
  ])
 
  return useMemo(() => ({
    stack: state,
    enqueueSnackbar: handleEnqueueSnackbar,
    closeSnackbar: handlerCloseSnackbar,
  }), [
    state,
  ])
}