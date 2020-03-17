import React from 'react'
import FormCategories from './components/FormCategories'
import {
  Snackbar, Button, Dialog, DialogContent, DialogActions
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ListCategories from './components/ListCategories'

export default function Categories (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const [openFormUpdate, setOpenFormUpdate] = React.useState(0)
  const [initialValueUpdate, setInitialValueUpdate] = React.useState({
    id: 0,
    name: ''
  })
  const handleOpenFormUpdate = () => {
    setOpenFormUpdate(1)
  }
  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(0)
  }
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <FormCategories setMsg={setMsg} initialValues={{ name: '' }} />
      <ListCategories
        setMsg={setMsg}
        handleOpenFormUpdate={handleOpenFormUpdate} 
        setInitialValueUpdate={setInitialValueUpdate}
      />
      <Dialog
        open={openFormUpdate}
        maxWidth='md'
        fullWidth='lg'
        onClose={handleCloseFormUpdate}
      >
        <DialogContent>
          <FormCategories
            setMsg={setMsg}
            update={initialValueUpdate.id}
            initialValues={initialValueUpdate}
            setInitialValueUpdate={setInitialValueUpdate}
            handleCloseFormUpdate={handleCloseFormUpdate}
          />
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={handleCloseFormUpdate}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
