import React, { useState, useEffect } from 'react';
import { Card } from "@mui/material"
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { addProduct,removeProduct } from '../Store/productSlice';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';

function ProductList(props){
  const dispatch = useDispatch();
    
  const products =props.products?props.products:[]
    const productstore = useSelector((state) => state.products);
   

        const addTodoHandler = (product) => {
          dispatch(addProduct(product));
        };

        const removeTodoHandler = (product) => {
          dispatch(removeProduct(product));
        };

        const findInStore=(id)=>{
        let  objIndex = productstore.findIndex((obj => obj.id === id));
        return objIndex===-1? true:false;
        }
 
        
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {products &&
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    pb: "5px",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to={`/Products/${product.id}`}
                    style={{ width: "100%" }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={product.thumbnail}
                    />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h6">
                      <strong>${product.price}</strong>
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </Typography>

                    Discount: <Chip color='error' style={{backgroundColor:'yellow',border:'1px solid #000', color:'#000'}} label={product.discountPercentage +'%'} variant="contained" />
                    
                    <Rating name="read-only" value={product.rating} readOnly />
                  </CardContent>
                  <CardActions
                    style={{ justifyContent: "center", flexWrap: "wrap" }}
                  >
                    <Link
                      to={`/Products/${product.id}`}
                      style={{ width: "100%", marginBottom: "10px" }}
                    >
                      <Button
                        style={{ width: "100%" }}
                        variant="outlined"
                        size="large"
                        color="primary"
                      >
                        VIEW Product
                      </Button>
                    </Link>

                    {findInStore(product.id) ? (
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={() => {
                          addTodoHandler(product);
                        }}
                      >
                        Add To Cart
                      </Button>
                    ) : (
                      <Button
                        style={{ width: "100%" }}
                        variant="contained"
                        color="error"
                        size="large"
                        onClick={() => {
                          removeTodoHandler(product);
                        }}
                      >
                        Remove from cart
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    );
}
export default ProductList;