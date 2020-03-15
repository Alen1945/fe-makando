import React from 'react'
import { Formik } from 'formik'
import { Paper, Snackbar,Grid, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import FormItem from './components/FormItem'
import submitData from '../../helpers/submitData'
import {makeStyles} from '@material-ui/styles'
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

const useStyles = makeStyles({
  modal:{
    position:'absolute',
    top:0,
    right:-10,
    transition:'0.5s ease-in'
  }
})
export default function Items (props) {
  const classes=useStyles()
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
      <Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant='h6' align='center'>Add Item</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Paper elevation={5}>
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
                    const formData = new FormData()
                    Object.keys(values).forEach(v => {
                      formData.append(v, values[v])
                    })
                    const response = await submitData('/items', formData)
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
                <FormItem />
              </Formik>
            </Paper>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <ListItem />
    </>
  )
}