import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell,
  Avatar, IconButton
} from '@material-ui/core'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'

export default function ListItem (props) {
  const [Items, setItems] = React.useState([])
  const [restaurant, setRestaurant] = React.useState([])
  const getItems = async () => {
    try {
      const response = await getData('/browse-items?limit=100000')
      setItems(response.data.dataItems)
    } catch (e) {
      console.log(e)
    }
  }
  const getrestaurant = async () => {
    try {
      const response = await getData('/users/restaurants?limit=100000')
      if (response.data.success && response.data.data) {
        console.log(response.data)
        setRestaurant(response.data.data.map(v => v._id))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const deleteItem = async (id) => {
    try {
      const response = await deleteData(`/items/${id}`)
      console.log(response)
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
      <Grid container justify='center' component={Container}>
        <Grid item sm={10} md={8}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell align='right'>Image</TableCell>
                  <TableCell align='right'>Name</TableCell>
                  <TableCell align='right'>Category</TableCell>
                  <TableCell align='right'>Restaurant</TableCell>
                  <TableCell align='right'>Price</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Items && Items.length > 0 && restaurant.length > 0 && Items.filter(v => restaurant.includes(v.id_restaurant)).map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton><Edit /></IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => deleteItem(item._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell align='right'>
                      <Avatar
                        alt={item.name_item} src={(process.env.REACT_APP_API_URL + '/' + item.images)}
                        style={{ height: '50px', width: '50px' }}
                      />
                    </TableCell>
                    <TableCell align='right'>{item.name}</TableCell>
                    <TableCell align='right'>{item.name_category}</TableCell>
                    <TableCell align='right'>{item.name_restaurant}</TableCell>
                    <TableCell align='right'>{item.price}</TableCell>
                    <TableCell align='right'>{item.quantity}</TableCell>
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
