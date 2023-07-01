import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './Pages/AddressForm';
import PaymentForm from './Pages/PaymentForm';
import Review from './Pages/Review';
import { addAddress } from '../Store/addressSlice';
import { addCard } from '../Store/cardSlice';
import { useDispatch } from 'react-redux';
import { removeAll } from '../Store/productSlice';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const steps = ['Shipping address', 'Payment details', 'Review your order'];
export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useDispatch();
 const [addressSave, setAddressSave] = useState({
    firstName:'',
    lastName:'',
    address1:'',
    address2:'',
    city:'',
    zip:'',
    country:'',
  });
  const [paymentSave, setPaymentSave]= useState({
    cardName:'',
    cardNumber:'',
    expDate:'',
    cvv:'',
  })

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm enable={setBtnDisabled} fromData={addressSave} addressSave={setAddressSave} />;
      case 1:
        return <PaymentForm enable={setBtnDisabled} fromDataPayment={paymentSave} paymentSave={setPaymentSave} />;
      case 2:
        return <Review fromData={addressSave} fromDataPayment={paymentSave} />;
      default:
        throw new Error('Unknown step');
    }
  }
  const handleNext = () => {
      setActiveStep(activeStep + 1);
       if(activeStep===0){
        dispatch(addAddress(addressSave));
       }
       if(activeStep===1){
       dispatch(addCard(paymentSave));
       }
       if(activeStep===2){
        dispatch(removeAll());
        }
     };
  
    const handleBack = () => {
       setActiveStep(activeStep - 1);
  
     };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                
                  variant="contained"
                  onClick={handleNext}
                  disabled={btnDisabled}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </>
  );
}

  