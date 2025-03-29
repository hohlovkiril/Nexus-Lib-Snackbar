import React from "react";
import { SnackbarContent, Stack } from "@mui/material";
import { SnackbarItem } from "../common";

interface IProps {
  item: SnackbarItem;
}

export const SnackbarItemContainer: React.FC<IProps> = (props) => {
  
  return (
    <SnackbarContent
    
      className={['snackbar', props.item.className].join(' ')}
      message={(
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          gap={1}
        >
          {props.item.icon}
          {props.item.message}
        </Stack>
      )}
      action={props.item.actions ? props.item.actions(props.item.id) : undefined}
      sx={{ mt: 0, mb: 0 }}
    />
  )
}