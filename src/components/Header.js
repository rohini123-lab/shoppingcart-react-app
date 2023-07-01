import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
function Header(){
  const products = useSelector((state) => state.products);
return (
  <AppBar position="fixed">
    <Container maxWidth="md">
    <Toolbar
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <Typography variant="h6" color="white" noWrap>
          ShoppingCart
        </Typography>
      </Link>
      <Link to="/" style={{color:'#fff'}}>
      <Badge badgeContent={products.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
      </Link>
    </Toolbar>
    </Container>
  </AppBar>
);
}
export default Header;