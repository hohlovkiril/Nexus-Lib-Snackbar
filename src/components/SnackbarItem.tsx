import React from "react";
import { SnackbarContent } from "@mui/material";
import { SnackbarItem } from "../common";

interface IProps {
  item: SnackbarItem;
}

export const SnackbarItemContainer: React.FC<IProps> = (props) => {
  
  return (
    <SnackbarContent
      className={['snackbar', props.item.className].join(' ')}
      message={props.item.message}
      action={props.item.actions ? props.item.actions(props.item.id) : undefined}
      sx={{ mt: 0, mb: 0 }}
    />
  )
}