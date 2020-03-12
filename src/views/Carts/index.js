import React from 'react'
import { Container, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core'
import CartItems from './components/CartItems'
import CheckoutDetails from './components/CheckoutDetails'
import CheckoutDone from './components/CheckoutDone'
function getStepContent (page, setActiveStep) {
  switch (page) {
    case 0:
      return (<CartItems setActiveStep={setActiveStep} />)
    case 1:
      return (<CheckoutDetails setActiveStep={setActiveStep} />)
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
      {getStepContent(activeStep, setActiveStep)}
    </>
  )
}

export default ShowCarts
