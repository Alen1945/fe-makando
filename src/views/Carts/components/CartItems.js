import React from 'react'
import { Container, Grid, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, Box,Button } from '@material-ui/core'

export default function CartItems (props) {
  const handleClick = (e) => {
    props.setActiveStep(1)
  }
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
                  <TableCell align='right'>Total Items</TableCell>
                  <TableCell align='right'>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    edit Delete
                  </TableCell>
                  <TableCell align='right'>Image</TableCell>
                  <TableCell align='right'>Seblack</TableCell>
                  <TableCell align='right'>2</TableCell>
                  <TableCell align='right'>5000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid container justify='center' component={Container} style={{marginTop:20}}>
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