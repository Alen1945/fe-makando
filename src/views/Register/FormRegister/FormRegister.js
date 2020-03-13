import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { Form } from 'formik'
import CustomTextField from '../../../components/CustomTextField'

function FormRegister (props) {
  return (
    <Form>
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Username' name='username' variant='outlined' type='text'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='E-Mail' name='email' variant='outlined' type='text'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Password' name='password' variant='outlined' type='password'
      />
      <CustomTextField
        component={TextField}
        fullWidth margin='normal' label='Confirm Password' name='confirm_password' variant='outlined' type='password'
      />
      <Button
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        color='secondary'
      >
        <strong>Registrasi</strong>
      </Button>
    </Form>
  )
}
export default FormRegister
