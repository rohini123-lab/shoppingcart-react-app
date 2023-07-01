import { useState, useEffect } from 'react';
import { Card } from "@mui/material"
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct,removeProduct } from '../Store/productSlice';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';


function ProductList(props){
  const productstore = useSelector((state) => state.products);
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
    const fetchProducts = async () => {
            const response = await fetch(
               'https://dummyjson.com/products'
            );
            const productsData = await response.json();
            setProducts(productsData.products);
         };
         fetchProducts();
        }, []);

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
        {/* End hero unit */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  pb: "5px",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={product.thumbnail}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title} <strong>${product.price}</strong>
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Rating name="read-only" value={product.rating} readOnly />
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Link to={`/Products/${product.id}`}>
                    <Button variant="outlined" size="small">
                      Details
                    </Button>
                  </Link>
                  {findInStore(product.id) ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{ selfAlign: "left" }}
                      onClick={() => {
                        addTodoHandler(product);
                      }}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        removeTodoHandler(product);
                      }}
                    >
                      Remove
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