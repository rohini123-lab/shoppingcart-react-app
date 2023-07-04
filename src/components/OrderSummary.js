import { Button, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../Store/productSlice';



function OrderSummary(){
  const dispatch = useDispatch();
   const navigate = useNavigate();
    const productstore = useSelector((state) => state.products);
    const CalculatePrice = productstore.reduce((prevVal,currVal)=>{
        return prevVal + currVal.price
      }, 0)

      const removeTodoHandler = (product) => {
        dispatch(removeProduct(product));
      };
    return (
      <>
        <Container sx={{ py: 10 }} maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {productstore.map((product) => (
              <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
                <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              style={{ width: "20%" }}
            />      
                <ListItemText
                  primary={product.title}
                  secondary={product.discription}
                  style={{marginLeft:'10px'}}
                />
            
                <Typography variant="body2">${product.price} </Typography>
                <IconButton aria-label="delete" color="error" variant="outlined" size="large">
                  <DeleteIcon 
                  color="error" 
                  variant="outlined" 
                  onClick={() => {
                    removeTodoHandler(product);
                  }}
                   />
                </IconButton>
              </ListItem>
            ))}
            <hr />
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle" sx={{ fontWeight: 800 }}>
                ${CalculatePrice} ({productstore.length})
              </Typography>
            </ListItem>
          </List>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              size="large"
              onClick={() => navigate(-1)}
              variant="outlined"
              color="primary"
            >
             <ArrowBackIosIcon /> Back
            </Button>
            <Button
              size="large"
              onClick={() => navigate("/checkout")}
              variant="contained"
              color="secondary"
            >
              Proceed to checkout
            </Button>
          </div>
        </Container>
      </>
    );
}
export default OrderSummary;