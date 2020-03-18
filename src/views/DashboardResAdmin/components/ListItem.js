import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell,
  Avatar, IconButton
} from '@material-ui/core'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'
import AlertDelete from '../../../components/AlertDelete'

export default function ListItem (props) {
  const { setInitialValue, handleClickOpenForm } = props
  const [Items, setItems] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const handeClickUpdate = async (id) => {
    await getitem(id)
    handleClickOpenForm()
  }
  const getItems = async () => {
    try {
      const response = await getData('/browse-items?sort[_id]=1&limit=100000')
      setItems(response.data.dataItems)
    } catch (e) {
      console.log(e)
    }
  }
  const getrestaurant = async () => {
    try {
      const response = await getData('/users/restaurants?limit=100000')
      if (response.data.success && response.data.data) {
        setRestaurant(response.data.data.map(v => v._id))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getitem = async (id) => {
    try {
      const response = await getData(`/browse-items/${id}`)
      const { _id, ...updateValue } = response.data.data
      setInitialValue({ id: _id, ...updateValue })
    } catch (e) {
      console.log(e)
      console.log(e.response)
    }
  }
  const deleteItem = async (id) => {
    try {
      const response = await deleteData(`/items/${id}`)
      console.log(response)
      setOpenDialogDelete(0)
      props.showMessage(response.data)
    } catch (e) {
      console.log(e)
      console.log(e.response)
      props.showMessage(e.response.data)
    }
  }
  React.useEffect(() => {
    getrestaurant()
    getItems()
  }, [props])
  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteItem(deleteId)}
      />
      <Grid container justify='center' component={Container}>
        <Grid item sm={12} md={10}>
          <TableContainer align='center'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Items && Items.length > 0 && restaurant.length > 0 && Items.filter(v => restaurant.includes(v.id_restaurant)).map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton onClick={() => handeClickUpdate(item._id)}><Edit /></IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(item._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        alt={item.name_item ? item.name_item : 'item' + item._id} src={(process.env.REACT_APP_API_URL + '/' + item.images)}
                        style={{ height: '50px', width: '50px' }}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.name_category}</TableCell>
                    <TableCell>{item.name_restaurant}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  )
}
