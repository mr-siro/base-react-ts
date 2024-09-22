import React from 'react'
// material ui
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { createStyles } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles: any = makeStyles(() =>
  createStyles({
    notification: {
      zIndex: '10000 !important',
    },
  })
)
export function Notification(): React.ReactElement {
  const open = false;
  const message = 'dadadad';
  const severity = 'success';
  // classes
  const classes = useStyles()

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    // notificationVar({ open: false, message: '', severity: severity })
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={classes.notification}
    >
      <Alert onClose={handleClose} severity={severity} variant="standard">
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Alert>
    </Snackbar>
  )
}