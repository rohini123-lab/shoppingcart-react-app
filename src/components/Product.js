import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ProductList from './ProductList';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

function Product(){
  const productsStore = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [originamProducts,setOriginamProducts]=useState([]);
  const [products, setProducts] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
            const response = await fetch(
               'https://dummyjson.com/products'
            );
            const productsData = await response.json();
            setProducts(productsData.products);
            setOriginamProducts(productsData.products);
            const categoryNames = productsData.products && productsData.products.map(product => product.category);
            // Remove duplicates and obtain unique category names
            const uniqueCategoryNames = [...new Set(categoryNames)];
            // Create an array from unique category names
            const categoryArray = uniqueCategoryNames;
            setCategoryArray(categoryArray);
         };
         fetchProducts();
        }, []);

  const [category, setCategory] = React.useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
  
    if(event.target.value==='all'){
      setProducts(originamProducts);
    }else{
      const filterProducts= originamProducts.filter((product)=>{
        return product.category === event.target.value;
        })
        setProducts(filterProducts);
    }
   
  };

  
    return (
      <>
          <Container sx={{ py: 10 }} maxWidth="md">
           
          <Typography   gutterBottom variant="h3" component="h3">
            Products
          </Typography>
                  
                   <Stack
             sx={{ pt: 0,pb: 0 }}
              direction="row"
              spacing={2}
              justifyContent="space-between"
            >
  <FormControl style={{width:'200px'}} >
  <InputLabel id="demo-simple-select-label" >Filter by Category</InputLabel>
  <Select 
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    className='ui-select'
    onChange={handleChange}
  >
    <MenuItem key={'all'} value={'all'}>All</MenuItem>
    {categoryArray && categoryArray.map((m)=>{
      return <MenuItem key={m} value={m}>{m}</MenuItem>
    })}
   
  </Select>
</FormControl>
              <Button
                onClick={() => navigate("order-summary")}
                disabled={productsStore.length > 0 ? false : true}
                variant="contained"
                color="secondary"
                size='large'
              >
                view cart 
              </Button>
            </Stack>
          
        {products ?<ProductList products={products}></ProductList>:"Loading" }
        </Container>
      </>
    );
}
export default Product;
