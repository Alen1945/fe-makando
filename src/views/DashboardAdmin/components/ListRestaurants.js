import React from 'react'
import { Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Avatar, IconButton ,Button, TextField } from '@material-ui/core'
import getData from '../../../helpers/getData'
import {Edit, Delete} from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'

export default function ListItem (props) {
  const [restaurant, setRestaurant] = React.useState([])
  const getrestaurant = async () => {
    try {
      const response = await getData('/restaurants?limit=10000')
      if (response.data.success && response.data.data) {
        console.log(response.data)
        setRestaurant(response.data.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const deleteRestaurant = async (id) => {
    try {
      const response = await deleteData(`/restaurants/${id}`)
      await props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      await props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getrestaurant()
  },[props])
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
                  <TableCell align='right'>Owner</TableCell>
                  <TableCell align='right'>Address</TableCell>
                  <TableCell align='right'>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(restaurant)}
                {restaurant.length >0 && restaurant.map((resto) => (
                  <TableRow key={resto._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton><Edit/></IconButton>&nbsp;&nbsp;<IconButton onClick={()=>deleteRestaurant(resto._id)}><Delete/></IconButton>
                    </TableCell>
                    <TableCell align='right'> <Avatar alt={resto.name} src={(process.env.REACT_APP_API_URL + '/' + resto.logo)} style={{height:'50px',width:'50px'}} /></TableCell>
                    <TableCell align='right'>{resto.name}</TableCell>
                    <TableCell align='right'>{resto.owner}</TableCell>
                    <TableCell align='right'>{resto.address}</TableCell>
                    <TableCell align='right'>{resto.description}</TableCell>
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
