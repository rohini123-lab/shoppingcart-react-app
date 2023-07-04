import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

const Header = lazy(() => import('./components/Header'));
const CheckOut = lazy(() => import('./components/CheckOut'));
const Product = lazy(() => import('./components/Product'));
const OrderSummary = lazy(() => import('./components/OrderSummary'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Search = lazy(() => import('./components/Search'));
const NoMatch = lazy(() => import('./components/NoMatch'))

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
        </Typography>
      </>
    );
  }

return (
  <>
    <Header />
    <main>
      <Suspense
        fallback={
          <div className="container">
            <Box sx={{ display: "flex" }}>
              Loading <CircularProgress />
            </Box>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/Products/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/search/:q" element={<Search/>} />

        </Routes>
      </Suspense>
    </main>
    {/* Footer */}
    <Container sx={{ py: 0 }} maxWidth="md">
    <Box sx={{ bgcolor: "background.paper", p: 0 }} component="footer">
      <Typography variant="h6" align="center" >
        <Copyright sx={{ mt: 1, mb: 2 }} />
      </Typography>
    </Box>
    </Container>
  </>
);
}