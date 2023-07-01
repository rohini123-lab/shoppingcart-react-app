import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from "@mui/material"
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct,removeProduct } from '../Store/productSlice';


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

    return (
        <Container sx={{ py: 10 }} maxWidth="md">
        <Button variant='contained'  onClick={() => navigate(-1)} style={{ marginBottom: '20px', }}>
          Go Back
        </Button>
        <Card sx={{ height: '100%', maxWidth: 550, display: 'flex', flexDirection: 'column' }} >
                  <CardMedia
                    component="img"
                    image={product.thumbnail}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      
                      {product.title} <strong>${product.price}</strong>
                    </Typography>
                    <Typography>
                    {product.description}
                    </Typography>
                    <Typography>
                    Rating:  <Rating name="read-only" value={product.rating} readOnly />
                    </Typography>
                    <Typography>
                    category: {product.category}
                    </Typography>
                  </CardContent>

                  {findInStore(product.id) ? (
                    <Button
                      variant="contained"
                      size="small"
                      style={{ selfAlign: "left" }}
                      onClick={() => {
                        addTodoHandler(product);
                      }}
                    >
                      Add product
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
                </Card>
        
      </Container>
    );
}
export default ProductDetails;