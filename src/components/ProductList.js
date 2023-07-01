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
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { addProduct,removeProduct } from '../Store/productSlice';
import { useSelector } from 'react-redux';

function ProductList(props){
    const [products, setProducts] = useState([]);
    const productstore = useSelector((state) => state.products);
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
                <Link to={`/Products/${product.id}`} style={{ width: "100%" }}>
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
                  <Typography gutterBottom variant="h5" component="h2"    sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
   }}>
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                    <strong>${product.price}</strong>
                  </Typography>
                  <Typography    sx={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
   }}>{product.description}</Typography>
                  <Rating name="read-only" value={product.rating} readOnly />
                </CardContent>
                <CardActions style={{ justifyContent: "center",flexWrap: 'wrap', }}>
                  <Link
                    to={`/Products/${product.id}`}
                    style={{ width: "100%", marginBottom:'10px' }}
                  >
                    <Button
                      style={{ width: "100%" }}
                      variant="outlined"
                      size="small"
                      color='info'
                    >
                      VIEW Product
                    </Button>
                  </Link>

                  {findInStore(product.id) ?(<Button
                      variant="contained"
                      size="small"
                      color='success'
                      style={{ width: "100%" }}
                      onClick={() => {
                        addTodoHandler(product);
                      }}
                    >
                      Add
                    </Button> ) : (<Button
                    style={{ width: "100%" }}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                      removeTodoHandler(product);
                    }}
                  >
                    Remove
                  </Button>)}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}
export default ProductList;