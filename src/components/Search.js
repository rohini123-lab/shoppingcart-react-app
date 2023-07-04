import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function Search({ props }) {
  const productsStore = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { q } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://dummyjson.com/products/search?q=" + q
      );
      const productsData = await response.json();
      setProducts(productsData.products);
    };
    fetchProducts();
  }, [q]);

  return (
    <>
      <Container sx={{ py: 10 }} maxWidth="md">
        <Typography gutterBottom variant="h3" component="h3">
          Search
        </Typography>

        <Stack
          sx={{ pt: 0, pb: 0 }}
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
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
            onClick={() => navigate("/order-summary")}
            disabled={productsStore.length > 0 ? false : true}
            variant="contained"
            color="secondary"
            size="large"
          >
            view cart
          </Button>
        </Stack>

        {products && products.length >= 1 ? (
          <ProductList products={products}></ProductList>
        ) : (
          "no product found"
        )}
      </Container>
    </>
  );
}
export default Search;
