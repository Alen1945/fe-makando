import React from 'react'
import {
  Container, Grid, Table, TableContainer, TableHead, TableRow,
  TableBody, TableCell, IconButton
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import getData from '../../../helpers/getData'
import { Edit, Delete } from '@material-ui/icons'
import deleteData from '../../../helpers/deleteData'

export default function ListItem (props) {
  const { handleOpenFormUpdate, setInitialValueUpdate } = props
  const [categories, setCategories] = React.useState([])
  const [page, setPage] = React.useState(1)

  const handleChange = (event, value) => {
    setPage(value)
  }
  const handeClickUpdate = async (id) => {
    await getCategory(id)
    handleOpenFormUpdate()
  }
  const getCategories = async () => {
    try {
      const response = await getData('/browse-categories?sort[name]&page=' + page)
      console.log(response)
      setCategories(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const getCategory = async (id) => {
    try {
      const response = await getData(`/browse-categories/${id}`)
      setInitialValueUpdate({id: response.data._id, name: response.data.name })
    } catch (e) {
      console.log(e)
      console.log(e.response)
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
  }, [props, page])
  return (
    <>
      <Grid container justify='center' component={Container}>
        <Grid item sm={8} md={6}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Action</TableCell>
                  <TableCell align='center'>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.data && categories.data.length > 0 && categories.data.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell align='center' component='th' scope='row'>
                      <IconButton onClick={() => handeClickUpdate(item._id)}><Edit /></IconButton>&nbsp;&nbsp;
                      <IconButton onClick={() => deleteCategories(item._id)}><Delete /></IconButton>
                    </TableCell>
                    <TableCell align='center'>{item.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {
          categories.pagination && categories.pagination.totalPages > 1 && (
            <Grid container justify='center' style={{ marginTop: '50px' }}>
              <Pagination page={page} onChange={handleChange} count={categories.pagination.totalPages} color='secondary' />
            </Grid>
          )
        }
      </Grid>
    </>
  )
}
