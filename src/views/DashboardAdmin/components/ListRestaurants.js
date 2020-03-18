import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow,
  TableBody, TableCell, Avatar, IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'
import AlertDelete from '../../../components/AlertDelete'

export default function ListItem (props) {
  const [restaurant, setRestaurant] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [openDialogDelete, setOpenDialogDelete] = React.useState(0)
  const [deleteId, setDeleteId] = React.useState(0)

  const handleChangePage = (event, value) => {
    setPage(value)
  }
  const handleOpenDialogDelete = (id) => {
    setDeleteId(id)
    setOpenDialogDelete(1)
  }
  const getrestaurant = async (page) => {
    try {
      const response = await getData('/restaurants?sort[_id]=1&page=' + page)
      if (response.data.success && response.data.data) {
        console.log(response.data)
        setRestaurant(response.data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const deleteRestaurant = async (id) => {
    try {
      const response = await deleteData(`/restaurants/${id}`)
      setOpenDialogDelete(0)
      await props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      await props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getrestaurant(page)
  }, [props, page])
  return (
    <>
      <AlertDelete
        open={openDialogDelete}
        maxWidth='sm'
        fullWidth='md'
        onClose={() => setOpenDialogDelete(0)}
        onCancel={() => setOpenDialogDelete(0)}
        onDelete={() => deleteRestaurant(deleteId)}
      />
      <Grid container justify='center' component={Container}>
        <Grid item sm={11} md={10}>
          <TableContainer align='center'>
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
                {restaurant.data && restaurant.data.length > 0 && restaurant.data.map((resto) => (
                  <TableRow key={resto._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton>
                        <Edit />
                      </IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => handleOpenDialogDelete(resto._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                    <TableCell align='right'> <Avatar alt={resto.name ? resto.name : 'Res' + resto._id} src={(process.env.REACT_APP_API_URL + '/' + resto.logo)} style={{ height: '50px', width: '50px' }} /></TableCell>
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
      {
        restaurant.pagination && (
          <Grid container justify='center' style={{ marginTop: '50px' }}>
            <Pagination page={page} onChange={handleChangePage} count={restaurant.pagination.totalPages} color='secondary' />
          </Grid>
        )
      }
    </>
  )
}
