import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ProductList from './ProductList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Product(){
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
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
              <Button
                onClick={() => navigate("checkout")}
                disabled={products.length > 0 ? false : true}
                variant="contained"
                color="secondary"
              >
                CheckOut
              </Button>
            </Stack>
          </Container>
        </Box>
        <ProductList></ProductList>
      </Container>
    );
}
export default Product;