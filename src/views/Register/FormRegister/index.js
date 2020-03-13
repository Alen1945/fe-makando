import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, CardHeader, Button, CardMedia, CardActions, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import logo from '../../../assets/logo.png'
import * as Yup from 'yup'
import { Formik } from 'formik'
import submitData from '../../../helpers/submitData'
import FormRegister from './FormRegister'
const useStyles = makeStyles({
  content: {
    marginTop: '80px'
  },
  containerForm: {
    padding: '20px'
  }
})

const initialFormRegistrasi = {username: '', password: '', confirm_password: ''}
const msgRequired ='This is Required'
const validationFormRegistrasi = Yup.object({
  username: Yup.string().min(6, 'Username have 6 character or more')
    .required(msgRequired),
  password: Yup.string().min(8, 'Username have 8 character or more')
    .required(msgRequired),
  email: Yup.string().email('Invalid email address')
    .required(msgRequired),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password Not Match').required(msgRequired)
})

function LayoutRegister (props) {
  const classes = useStyles()
  return (
    <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
      <Grid item md={5} lg={4} sm={8}>
        <Card className={classes.containerForm}>
          <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} />} />
          <CardMedia>
            <Formik
              initialValues={initialFormRegistrasi}
              validationSchema={validationFormRegistrasi}
              onSubmit={async (values, form) => {
                try {
                  const response = await submitData('/register', values)
                  if (response.data.success) {
                    form.setSubmitting(false)
                    form.resetForm()
                    props.setSuccessRegister(1)
                  }
                  props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                } catch (e) {
                  console.log(e)
                  props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                }
              }}
            >
              <FormRegister />
            </Formik>
          </CardMedia>
          <CardActions style={{marginTop:'30px'}}>
            <Typography variant='p' color='textSecondary'>Already have Account?</Typography>
            <Button size='medium' variant='outlined' color='primary' to='/login' component={Link}>
              Login
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
export default LayoutRegister
