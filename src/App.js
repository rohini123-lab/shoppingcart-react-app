import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
const Header = lazy(() => import('./components/Header'));
const CheckOut = lazy(() => import('./components/CheckOut'));
const Product = lazy(() => import('./components/Product'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const NoMatch = lazy(() => import('./components/NoMatch'))



// TODO remove, this demo shouldn't need to reset the theme.


export default function App() {
  
  function Copyright(props) {
    return (
      <>
        <hr />
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </>
    );
  }

return (
  <>
  
       <Header   />
       <main>
      <Suspense fallback={<div className="container"><Box sx={{ display: 'flex' }}>
  Loading <CircularProgress />
</Box></div>}>
       <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/Products/:id" element={<ProductDetails />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Typography>
      </Box>
    </>
  );
}