import React from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, MenuItem, Button, TextField, Input } from '@material-ui/core'
import { Form, Field } from 'formik'
import CustomTextField from '../../../components/CustomTextField'
import getData from '../../../helpers/getData'

export default function FormItem (props) {
  const [users, setUsers] = React.useState([])
  const getUsers = async () => {
    try {
      const response = await getData('/users')
      if (response.data.success && response.data.data) {
        setUsers(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  React.useEffect(() => {
    getUsers()
  }, [])
  return (
    <Form>
      <Card elevation={0}>
        <CardHeader title='Adding Restaurants' titleTypographyProps={{variant: 'h5', align: 'center'}}/>
        <CardContent>
          <Grid container justify='center'>
            <Grid container sm={8} item spacing={2}>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField} fullWidth label='Owner' margin='dense'
                  name='id_owner' select variant='outlined'
                >
                  {
                    users.map(v => (
                      <MenuItem key={v._id} value={v._id} >
                        {v.username}
                      </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Name' margin='dense' name='name' type='text' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <Field
                  component={({ field, form, ...props }) => (
                    <TextField
                      fullWidth label='Logo' margin='dense' name='logo' type='file' onChange={(event) => {
                        form.setFieldValue('logo', event.currentTarget.files[0])
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Address' margin='dense' name='address' type='text' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  multiline
                  rows={2}
                  fullWidth label='Description' margin='dense' name='description' type='text' variant='outlined'
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button color='primary' variant='contained' type='submit' >
              Add Restaurants
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Form>
  )
}
