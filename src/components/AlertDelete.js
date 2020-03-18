import React from 'react'
import {
  Dialog, DialogActions, DialogContent, Typography, Button,
} from '@material-ui/core'
import { Warning } from '@material-ui/icons'
export default function AlertDelete (props) {
  const { onCancel, onDelete, ...resultProps } = props
  return (
    <Dialog
      {...resultProps}
    >
      <DialogContent align='center'>
        <Warning style={{ height: '100px', width: '100px' }} color='secondary' />
        <Typography variant='h6' color='secondary'> Are You Sure?</Typography>
        <Typography variant='subtite2' color='textSecondary'> You will not be able to recover this data</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' color='secondary' onClick={onDelete}>
          Yes, Delete it
        </Button>
      </DialogActions>
    </Dialog>
  )
}
