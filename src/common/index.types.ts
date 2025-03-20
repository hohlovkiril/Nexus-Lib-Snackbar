import React from "react";

export type SnackbarProverProps = {
  children: React.ReactNode;
}

export type SnackbarItem = {
  id: number;
  message: string;
  createdTimestamp: number;
} & SnackbarItemOptions;

export type SnackbarItemOptions = {
  icon?: React.ReactNode;
  className: string;
  position: SnackbarPosition;
  autoHideDuration?: number;
  actions?: (key: number) => React.ReactNode;
}

export type SnackbarPosition = 
  'top-start' | 'top-center' | 'top-end' |
  'bottom-start' | 'bottom-center' | 'bottom-end';

export type Reason =
  'clickClose' |
  'autoClose';