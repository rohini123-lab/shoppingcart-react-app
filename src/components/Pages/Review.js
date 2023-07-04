import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';


export default function Review(props) {
  const products = useSelector((state) => state.products);
  const address = useSelector((state) => state.address);
  console.log(address,'adaddress')
  const{firstName,lastName,address1,address2,city}=address[0];

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: `${props.fromData.firstName} ${props.fromData.lastName}`},
    { name: 'Card number', detail: props.fromDataPayment.cardNumber },
    { name: 'Expiry date', detail: props.fromDataPayment.expDate },
  ];
  const CalculatePrice = products.reduce((prevVal,currVal)=>{
    return prevVal + currVal.price
  }, 0)
  console.log(CalculatePrice);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

        {products.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.title} secondary={product.discription} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${CalculatePrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{firstName} {lastName}</Typography>
          <Typography gutterBottom>{address1} {address2} {city}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}