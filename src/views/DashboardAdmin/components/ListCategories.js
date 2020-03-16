import React from 'react'
import { Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Avatar, IconButton ,Button, TextField } from '@material-ui/core'
import getData from '../../../helpers/getData'
import {Edit, Delete} from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'

export default function ListItem (props) {
  const [categories, setCategories] = React.useState([])
  const getCategories = async () => {
    try {
      const response = await getData('/browse-categories?limit=100000')
      console.log(response)
      setCategories(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const deleteCategories = async (id) => {
    try {
      const response = await deleteData(`/categories/${id}`)
      await props.setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      await props.setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  React.useEffect(() => {
    getCategories()
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
                  <TableCell align='right'>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories && categories.length > 0 && categories.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component='th' scope='row'>
                      <IconButton><Edit/></IconButton>&nbsp;&nbsp;<IconButton onClick={()=>deleteCategories(item._id)}><Delete/></IconButton>
                    </TableCell>
                    <TableCell align='right'>{item.name}</TableCell>
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
