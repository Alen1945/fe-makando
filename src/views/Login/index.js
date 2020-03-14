import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Grid, TextField, Card, CardHeader, Button, CardMedia, CardActions, Snackbar } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../components/CustomTextField'
import submitData from '../../helpers/submitData'
import logo from '../../assets/logo.png'
import Cookies from 'js-cookie'
const useStyles = makeStyles({
  content: {
    marginTop: '80px'
  },
  containerForm: {
    padding: '20px'
  }
})
const initialFormLogin = {username: '', password: ''}
const msgRequired = 'This is Required'
const validationFormLogin = Yup.object({
  username: Yup.string().required(msgRequired),
  password: Yup.string().required(msgRequired)
})

function Login (props) {
  const classes = useStyles()
  const history = useHistory()
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Grid container component='main' maxWidth='xs' justify='center' className={classes.content}>
        <Grid item md={5} lg={4}>
          <Card className={classes.containerForm}>
            <CardHeader style={{ textAlign: 'center' }} title={<img src={logo} />} />
            <CardMedia>
              <Formik
                initialValues={initialFormLogin}
                validationSchema={validationFormLogin}
                onSubmit={async (values, form) => {
                  try {
                    const response = await submitData('/login', values)
                    if (response && response.data.success) {
                      Cookies.set('tokenm4k4nd0', response.data.data.token)
                      history.push('/')
                    }
                    setMsg({ display: 1, success: response.data.success, message: response.data.msg })
                  } catch (e) {
                    console.log(e)
                    setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
                  }
                }}
              >
                <Form>
                  <CustomTextField component={TextField} fullWidth margin='normal' name='username' type='text' label='Username' variant='outlined' />
                  <CustomTextField component={TextField} fullWidth margin='normal' name='password' type='password' label='password' variant='outlined' />
                  <Button
                    type='submit'
                    fullWidth
                    size='large'
                    variant='contained'
                    color='primary'
                  >
                    <strong>Login</strong>
                  </Button>
                </Form>
              </Formik>
            </CardMedia>
            <CardActions>
              <Button size='small' color='primary'>
                Forget Passowrd?
              </Button>
              <Button size='small' color='primary' to='/register' component={Link}>
                SignUp
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
export default Login
