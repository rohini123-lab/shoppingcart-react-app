import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function PaymentForm(props) {
  console.log(props)
  const [values, setValues]=useState(props.fromDataPayment)
  const [errors, setErrors]=useState({
    cardName:'',
    cardNumber:'',
    expDate:'',
    cvv:'',
  })
  function handleBlur(event){
    const {name, value}=event.target;
    setValues({...values, [name]:value});
    checkValidation(name);
  }
  function handleChange(event){
    const {name, value}=event.target;
    setValues({...values, [name]:value});
   checkValidation(name);
  }

  const checkValidation=(name)=>{
    let err= errors;
    if(!values[name]){
      console.log(err[name])
      err[name]=`${name} is required`;
    } else {
      err[name]='';
    }
    setErrors(err);

    let allTrue = Object.keys(values).every(function(k){ return values[k]!=='' });
    if(allTrue){
      props.enable(false);
      props.paymentSave(values);
    }else{
      props.enable(true);
    }

  };
  //this.props.elements.getElement('cardNumber')



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            name='cardName'
            autoComplete="cc-name"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardName.length > 0}
            helperText={errors.cardName}
            value={values.cardName}
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            name='cardNumber'
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cardNumber.length > 0}
            helperText={errors.cardNumber}
            value={values.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            name='expDate'
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.expDate.length > 0}
            helperText={errors.expDate}
            value={values.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            name='cvv'
           fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.cvv.length > 0}
            helperText={errors.cvv || 'Last three digits on signature strip'}
            value={values.cvv}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}