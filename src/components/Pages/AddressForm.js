import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useState} from 'react';


function AddressForm(props) {

console.log(props)
  const [values, setValues]=useState(
    props.fromData,
  )
  const [errors, setErrors]=useState({
    firstName:'',
    lastName:'',
    address1:'',
    address2:'',
    city:'',
    zip:'',
    country:'',
  })

  const handleSubmit = (event)=> {
    event.preventDefault();
    checkValidation();
    const data= new FormData(event.currentTarget);
    console.log({
      email: data.get('email')
    })
  }
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
      err[name]=`${name} ios required`;
    } else {
      err[name]='';
    }
    setErrors(err);

    let allTrue = Object.keys(values).every(function(k){ return values[k]!=='' });
    if(allTrue){
      props.enable(false);
      props.addressSave(values);
      
    }else{
      props.enable(true);
    }

  };

  return (

    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3} onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6}>
          <TextField    
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName.length > 0}
            helperText={errors.firstName}
            value={values.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName.length > 0}
            helperText={errors.lastName}
            value={values.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address1.length > 0}
            helperText={errors.address1}
            value={values.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address2.length > 0}
            helperText={errors.address2}
            value={values.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.city.length > 0}
            helperText={errors.city}
            value={values.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.zip.length > 0}
            helperText={errors.zip}
            value={values.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country.length > 0}
            helperText={errors.country}
            value={values.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;