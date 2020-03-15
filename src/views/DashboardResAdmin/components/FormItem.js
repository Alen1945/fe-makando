import React from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, MenuItem, Button, TextField, Input } from '@material-ui/core'
import { Form } from 'formik'
import CustomTextField from '../../../components/CustomTextField'
import getData from '../../../helpers/getData'

export default function FormItem (props) {
  const [category, setCategory] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  const getrestaurant = async () => {
    try {
      const response = await getData('/users/restaurants')
      if (response.data.success && response.data.data) {
        setRestaurant(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getCategory = async () => {
    try {
      const response = await getData('/browse-categories')
      if (response.data.success && response.data.data) {
        setCategory(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getrestaurant()
    getCategory()
  }, [])
  return (
    <Form>
      <Card elevation={0}>
        <CardHeader title='Adding Item' titleTypographyProps={{variant: 'h5', align: 'center'}}/>
        <CardContent>
          <Grid container justify='center'>
            <Grid container sm={8} item spacing={2}>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField} fullWidth label='Restaurant' margin='dense'
                  name='id_restaurant' select variant='outlined'
                >
                  {
                    restaurant.map(v => (
                      <MenuItem key={v._id} value={v._id} >
                        {v.name}
                      </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField} fullWidth label='Category' margin='dense'
                  name='id_category' select variant='outlined'
                >
                  {
                    category.map(v => (
                      <MenuItem key={v._id} value={v._id} >
                        {v.name}
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
                <CustomTextField
                  component={TextField}
                  fullWidth label='Quantity' margin='dense' name='quantity' type='number' required variant='outlined'
                />
              </Grid>
              <Grid item md={4} xs={6}>
                <CustomTextField
                  component={TextField}
                  fullWidth label='Price' margin='dense' name='price' type='number' required variant='outlined'
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
              {/* <Grid item md={4} xs={6}>
                <CustomTextField
                  component={Input}
                  fullWidth label='Images' margin='dense' name='images' type='file'
                  onChange={(event) => {
                    return props.setFieldValue('file', event.currentTarget.files[0])
                  }}
                />
              </Grid> */}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button color='primary' variant='contained' type='submit' >
              Add Item
            </Button>
          </Grid>
        </CardActions>
      </Card>
    </Form>
  )
}
