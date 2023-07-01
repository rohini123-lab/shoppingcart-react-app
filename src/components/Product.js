import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ProductList from './ProductList';
import { useSelector } from 'react-redux';


function Product(){
  const products = useSelector((state) => state.products);
  
    return (
      <Container sx={{ py: 8 }} maxWidth="md">
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container sx={{ py: 0 }} maxWidth="md">
            <Stack
              sx={{ pt: 2 }}
              direction="row"
              spacing={0}
              justifyContent="right"
            >
              {products.length>0 ?( <Link to="checkout">
                {" "}
                <Button variant="contained" color='secondary'>CheckOut</Button>
              </Link>):''}
             
            </Stack>
          </Container>
        </Box>
        <ProductList></ProductList>
      </Container>
    );
}
export default Product;