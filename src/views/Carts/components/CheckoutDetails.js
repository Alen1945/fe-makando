import React from 'react'
import { Container, Grid, Typography, Card, CardContent, CardActions, Button, Snackbar} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import getData from '../../../helpers/getData'
export default function CheckoutDetails (props) {
  const [msg, setMsg] = React.useState({ display: 0, success: false, message: '' })
  const handleClose = () => {
    setMsg({ display: 0 })
  }
  const handleClick = (step) => (e) => {
    props.setActiveStep(step)
  }
  const handleCheckout = async () => {
    try {
      const response = await getData('/checkout')
      if (response.data.success) {
        handleClick(2)()
      }
      setMsg({ display: 1, success: response.data.success, message: response.data.msg })
    } catch (e) {
      console.log(e.response)
      setMsg({ display: 1, success: e.response.data.success, message: e.response.data.msg })
    }
  }
  const [detailCheckout, setDetailCheckout] = React.useState({})
  React.useEffect(() => {
    setDetailCheckout(props.data.data)
    console.log(detailCheckout)
  },[props])
  return (
    <>
      <Snackbar open={msg.display} autoHideDuration={1000 * 5 * 60} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} variant='filled' elevation={6} severity={msg.success ? 'success' : 'error'}>
          {msg.message}
        </Alert>
      </Snackbar>
      <Grid container justify='center' component={Container}>
        <Grid item sm={10} md={8}>
          <Card>
            <CardContent>
              <Typography variant='h5' align='center' style={{marginBottom:'10px'}}>Details Purchase</Typography>
              <Typography align='center'>
                Total Price: { detailCheckout.totalPrice }
              </Typography>
              <Typography align='center'>
                Total Type Items: { detailCheckout.totalTypeItems }
              </Typography>
            </CardContent>
            <CardActions>
              <div style={{flexGrow:1}} />
              <Button size='small' variant='outlined' color='secondary' onClick={handleClick(0)}>Back</Button>
              <Button size='small' variant='contained' color='secondary' onClick={handleCheckout}>Checkout</Button>
              <div style={{flexGrow:1}} />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
} 