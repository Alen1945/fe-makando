import React from 'react'
import { Formik } from 'formik'
import { Paper, Snackbar,Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import FormRestaurants from './components/FormRestaurants'
import submitData from '../../helpers/submitData'
import {makeStyles} from '@material-ui/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListRestarants from './components/ListRestaurants'
const initialFormItem = { id_owner: '', name: '', logo: null, address: '', description: ''}
const msgRequired = 'This is Required'
const validationFormItem = Yup.object({
  id_owner: Yup.number().required(msgRequired),
  name: Yup.string().required(msgRequired),
  logo: Yup.mixed().required(),
  address: Yup.string().required(msgRequired),
  description: Yup.string()
})

export default function Items (props) {
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
      <Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant='h6' align='center'>Add Restaurants</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper elevation={5}>
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
                    const formData = new FormData()
                    Object.keys(values).forEach(v => {
                      formData.append(v, values[v])
                    })
                    const response = await submitData('/restaurants', formData)
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
                <FormRestaurants />
              </Formik>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <ListRestarants setMsg={setMsg} msg={msg}/>
    </>
  )
}
