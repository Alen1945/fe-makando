import React from 'react'
import { Container, CircularProgress, Grid, Typography } from '@material-ui/core'

export default function CheckoutDone (props) {
  const displayText = (props) => {
    if (props.status) {
      return (<Typography variant='h5' align='center' style={{ marginBottom: '10px' }}>Congratulation You Success for Checkout</Typography>)
    } else {
      return (<Typography variant='h5' align='center' style={{ marginBottom: '10px' }}><CircularProgress size={18} />&nbsp;&nbsp;Waiting for Payment</Typography>)
    }
  }
  return (
    <Grid container justify='center' component={Container}>
      <Grid item sm={10} md={8}>
        {displayText(props)}
      </Grid>
    </Grid>
  )
}
