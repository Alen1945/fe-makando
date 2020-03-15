import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import FormCategories from './components/FormCategories'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import submitData from '../../helpers/submitData'
const initialFormItem = { name: ''}
const msgRequired ='This is Required'
const validationFormItem = Yup.object({
  name: Yup.string().required(msgRequired)
})
export default function Categories (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
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
      <Formik
        initialValues={initialFormItem}
        validationSchema={validationFormItem}
        validate={
          (values)=>{
            console.log(values)
          }
        }
        onSubmit={async (values, form) => {
          try {
            const response = await submitData('/categories', values)
            if (response.data.success) {
              setMsg({ display: 1, success: response.data.success, message: response.data.msg })
              form.setSubmitting(false)
              form.resetForm()
            }
            setMsg({ display: 1, success: response.data.success, message: response.data.msg })
          } catch (e) {
            console.log(e)
            setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
          }
        }}
      >
        <FormCategories />
      </Formik>
    </>
  )
}
