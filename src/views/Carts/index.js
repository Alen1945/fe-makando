import React from 'react'
import { Container, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core'
import CartItems from './components/CartItems'
import CheckoutDetails from './components/CheckoutDetails'
import CheckoutDone from './components/CheckoutDone'
import getData from '../../helpers/getData'

function getStepContent (page, setActiveStep, data) {
  switch (page) {
    case 0:
      return (<CartItems setActiveStep={setActiveStep} data={data}/>)
    case 1:
      return (<CheckoutDetails setActiveStep={setActiveStep} data={data}/>)
    case 2:
      return (<CheckoutDone setActiveStep={setActiveStep} status={0} />)
    case 3:
      return (<CheckoutDone setActiveStep={setActiveStep} status={1} />)
    default:
      return 'Unknown Page'
  }
}
function ShowCarts (props) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [dataCart, setDataCart] = React.useState({})
  const getCartData = async () => {
    try {
      const response = await getData('/carts?sort[created_at]=1')
      setDataCart(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  React.useEffect(() => {
    getCartData()
  }, [])
  return (
    <>
      <div style={{ margin: '50px 0', paddingBottom: '10px', borderBottom: '0.2px solid #ccc' }}>
        <Container maxWidth='sm'>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>
                <Typography color='secondary'><strong>Cart Items</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='secondary'><strong>Checkout Details</strong></Typography>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Typography color='secondary'><strong>Done</strong></Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Container>
      </div>
      {getStepContent(activeStep, setActiveStep, dataCart)}
    </>
  )
}

export default ShowCarts
