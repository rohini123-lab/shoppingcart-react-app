import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct,removeProduct } from '../Store/productSlice';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function ProductDetails(){
  const productstore = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);

 const navigate = useNavigate();
 const { id } = useParams();
 useEffect(() => {
    const fetchProducts = async () => {
    const response = await fetch(
    `https://dummyjson.com/products/${id}`
    );
    const productsData = await response.json();
    setProduct(productsData);
    console.log(productsData)
    };
    fetchProducts();
    }, [id]);

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
      console.log(JSON.stringify(product))


function ProductImages({ images }) {

    return (
      <ImageList sx={{ minWidth:100}} cols={images.length} >
        {images.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img
              style={{border:'solid 2px #795548',maxWidth:140 }}
              src={`${imageUrl}?w=20&h=120&fit=crop&auto=format`}
              srcSet={`${imageUrl}?w=120&h=120&fit=crop&auto=format&dpr=2 2x`}
              alt={`${product.title} - ${index}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
}
  
if(product){
    return (
      <Container sx={{ pt: 10 }} maxWidth="md">
        <Stack
          sx={{ pt: 0, pb: 3 }}
          direction="row"
          spacing={0}
          justifyContent="space-between"
        >
          {" "}
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosIcon />
            Back
          </Button>
          <Button
            size="large"
            onClick={() => navigate("/order-summary")}
            disabled={productstore.length > 0 ? false : true}
            variant="contained"
            color="secondary"
          >
            view cart 
          </Button>
        </Stack>
        <Typography gutterBottom variant="h3" component="h3">
          {product.title} <strong>${product.price}</strong>
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={5} xs={12}>
            <img
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography>{product.description}</Typography>
            <Typography>Brand : {product.brand}</Typography>
            <Typography>Stock: {product.stock}</Typography>
            <Typography>Discount: {product.discountPercentage}%</Typography>

            {product.rating && (
              <Rating name="read-only" value={product.rating} readOnly />
            )}
            <Typography>category: {product.category}</Typography>
            {findInStore(product.id) ? (
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ selfAlign: "left", marginTop: "20px" }}
                onClick={() => {
                  addTodoHandler(product);
                }}
              >
                ADD TO CART
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                size="large"
                style={{ selfAlign: "left", marginTop: "20px" }}
                onClick={() => {
                  removeTodoHandler(product);
                }}
              >
                Remove from cart
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={12}>
            {product.images && <ProductImages images={product.images} />}
          </Grid>
        </Grid>
      </Container>
    );
}else{
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
}
export default ProductDetails;