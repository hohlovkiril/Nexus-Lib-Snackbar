import React from "react";
import { SnackbarProverProps, SnackbarItem, SnackbarPosition } from "common";
import { SnackbarContext, useSnackbarApi } from "../hooks";
import { Stack } from "@mui/material";
import { SnackbarItemContainer } from "../components/SnackbarItem";
import "../index.css";

export const SnackbarProvider: React.FC<SnackbarProverProps> = (props) => {
  const {
    stack,
    enqueueSnackbar,
    closeSnackbar,
  } = useSnackbarApi();

  const handlerCloseSnackbar = (id: number) => {
    closeSnackbar(id, 'clickClose')
  }

  const StackContainer = ({ stack, position }: { stack: SnackbarItem[], position: SnackbarPosition }) => {
    return (
      <Stack
        className={`snackbar-container snackbar-container-${position}`}
        justifyContent={position.includes('bottom') ? 'flex-end' : 'flex-start'}
        flexDirection={position.includes('bottom') ? 'column-reverse' : 'column'}
        alignItems='flex-end'
        gap={1}
        sx={{
          transition: 'top 300ms ease 0ms,right 300ms ease 0ms,bottom 300ms ease 0ms,left 300ms ease 0ms,max-width 300ms ease 0ms'
        }}
      >
        {stack.map((item, key) => (
          <SnackbarItemContainer
            key={key}
            item={item}
          />
        ))}
      </Stack>
    )
  }

  const topStart = stack.filter((noty) => noty.position === 'top-start');
  const topCenter = stack.filter((noty) => noty.position === 'top-center');
  const topEnd = stack.filter((noty) => noty.position === 'top-end');
  const bottomStart = stack.filter((noty) => noty.position === 'bottom-start');
  const bottomCenter = stack.filter((noty) => noty.position === 'bottom-center');
  const bottomEnd = stack.filter((noty) => noty.position === 'bottom-end');
  
  return (
    <SnackbarContext.Provider
      value={{
        enqueueSnackbar,
        closeSnackbar: handlerCloseSnackbar,
      }}
    >
      {props.children}
      {topStart && (
        <>
          <div
            id="snackbar-anchor-top-start"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: '10px',
              bottom: 'auto',
              left: 'auto',
              right: 'auto',
            }}
          >
          <StackContainer stack={topStart} position="top-start" />
          </div>
        </>
      )}
      {topCenter && (
        <>
          <div
            id="snackbar-anchor-top-center"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: '10px',
              bottom: 'auto',
              left: '50%',
              right: 'auto',
              transform: 'translate(-50%)'
            }}
          >
            <StackContainer stack={topCenter} position="top-center" />
            </div>
        </>
      )}
      {topEnd && (
        <>
          <div
            id="snackbar-anchor-top-start"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: '10px',
              bottom: 'auto',
              left: 'auto',
              right: '0px',
            }}
          >
          <StackContainer stack={topEnd} position="top-end" />
          </div>
        </>
      )}
      {bottomStart && (
        <>
          <div
            id="snackbar-anchor-bottom-start"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: 'auto',
              bottom: '10px',
              left: 'auto',
              right: 'auto',
            }}
          >
          <StackContainer stack={bottomStart} position="bottom-start" />
          </div>
        </>
      )}
      {bottomCenter && (
        <>
          <div
            id="snackbar-anchor-bottom-center"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: 'auto',
              bottom: '10px',
              left: '50%',
              right: 'auto',
              transform: 'translate(-50%)'
            }}
          >
          <StackContainer stack={bottomCenter} position="bottom-center" />
          </div>
        </>
      )}
      {bottomEnd && (
        <>
          <div
            id="snackbar-anchor-bottom-end"
            style={{
              overflow: 'hidden',
              position: 'absolute',
              top: 'auto',
              bottom: '10px',
              left: 'auto',
              right: '0px',
            }}
          >
            <StackContainer stack={bottomEnd} position="bottom-end" />
          </div>
        </>
      )}
    </SnackbarContext.Provider>
  )
}