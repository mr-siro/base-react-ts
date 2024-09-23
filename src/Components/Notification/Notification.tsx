import React from 'react'
// material ui
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { createStyles } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useAppDispatch, useAppSelector } from '@src/App/Store'
import { setToast } from '@src/App/Features/Layout'

const useStyles: any = makeStyles(() =>
  createStyles({
    notification: {
      zIndex: '10000 !important',
    },
  })
)
export function Notification(): React.ReactElement {
  const { toast } = useAppSelector(state => state.layout);
  const dispatch = useAppDispatch();
  // classes
  const classes = useStyles()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(setToast({ open: false, message: '', severity: toast.severity }))
  }

  return (
    <Snackbar
      open={toast.open}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={classes.notification}
    >
      <Alert onClose={handleClose} severity={toast.severity} variant="standard">
        <div dangerouslySetInnerHTML={{ __html: toast.message }} />
      </Alert>
    </Snackbar>
  )
}