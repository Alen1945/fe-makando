import React from 'react'
import { Formik } from 'formik'
import { Paper, Snackbar, Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import FormItem from './components/FormItem'
import submitData from '../../helpers/submitData'
import ListItem from './components/ListItem'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const initialFormItem = { id_restaurant: '', id_category: '', name: '', quantity: 0, price: 0, description: '', images: null }
const msgRequired = 'This is Required'
const validationFormItem = Yup.object({
  id_restaurant: Yup.number().required(msgRequired),
  id_category: Yup.number().required(msgRequired),
  name: Yup.string().required(msgRequired),
  quantity: Yup.number().required(msgRequired),
  price: Yup.number().required(msgRequired),
  description: Yup.string(),
  images: Yup.mixed().required()
})

export default function Items (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0, success: false, message: '' })
  }
  var showMessage = (dataMsg) => {
    setMsg({ display: 1, success: dataMsg.success, message: dataMsg.msg })
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
        <Alert variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant='h6' align='center'>Add Item</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper elevation={5}>
              <Formik
                initialValues={initialFormItem}
                validationSchema={validationFormItem}
                onSubmit={async (values, form) => {
                  try {
                    const formData = new FormData()
                    Object.keys(values).forEach(v => {
                      formData.append(v, values[v])
                    })
                    const response = await submitData('/items', formData)
                    if (response.data.success) {
                      showMessage(response.data)
                      form.setSubmitting(false)
                      form.resetForm()
                    }
                    showMessage(response.data)
                  } catch (e) {
                    console.log(e)
                    showMessage(e.response.data)
                  }
                }}
              >
                <FormItem />
              </Formik>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <ListItem showMessage={showMessage} />
    </>
  )
}
