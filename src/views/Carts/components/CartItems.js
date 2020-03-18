import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead,
  TableRow, TableBody, TableCell, Avatar, IconButton,
  Button, TextField
} from '@material-ui/core'
import { Edit, Delete, Check } from '@material-ui/icons'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomTextField from '../../../components/CustomTextField'
import deleteData from '../../../helpers/deleteData'
import AlertDelete from '../../../components/AlertDelete'

export default function CartItems (props) {
  const { setMsg } = props
  const handleClick = (e) => {
    props.setActiveStep(1)
  }
  const [itemCart, setItemCart] = React.useState([])
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)

  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const deleteCart = async (id) => {
    try {
      const response = await deleteData(`/carts/${id}`)
      if (response.data.success) {
        setOpenDialogDelete(0)
        setMsg({ display: 1, success: response.data.success, message: response.data.msg })
      }
    } catch (e) {
      console.log(e.response)
      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    setItemCart(props.data.data ? props.data.data.itemInCart : [])
  }, [props])
  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteCart(deleteId)}
      />
      <Grid container justify='center' component={Container}>
        <Grid item sm={10} md={8}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell align='right'>Image</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Total Items</TableCell>
                  <TableCell align='right'>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemCart.map((cart) => (
                  <TableRow key={cart._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton><Edit /></IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(cart._id)}><Delete /></IconButton>
                    </TableCell>
                    <TableCell align='right'>
                      <Avatar alt={cart.name_item} src={(process.env.REACT_APP_API_URL + '/' + cart.images)} style={{ height: '50px', width: '50px' }} />
                    </TableCell>
                    <TableCell align='right'>{cart.name_item}</TableCell>
                    <TableCell align='right'>
                      <Grid hidden={0}>
                        {cart.total_items}
                      </Grid>
                      <Grid hidden={1}>
                        <Formik
                          initialValues={{ total_items: cart.total_items }}
                          validationSchema={{ total_items: Yup.number().required() }}
                          validate={(value) => {
                            console.log(value)
                          }}
                        >
                          <Form>
                            <CustomTextField size='small' type='number' name='total_items' label='Total Items' variant='outlined' style={{ width: '100px' }} component={TextField} />
                            <Button size='small'>
                              <Check />
                            </Button>
                          </Form>
                        </Formik>
                      </Grid>
                    </TableCell>
                    <TableCell align='right'>{cart.total_price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justify='center' component={Container} style={{ marginTop: 20 }}>
        <Button
          color='secondary'
          variant='contained'
          onClick={handleClick}
        >
          Details Checkout
        </Button>
      </Grid>
    </>
  )
}
