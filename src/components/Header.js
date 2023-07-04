import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';

import logo from '../logo-anu-mart.png';

function Header(){
  const products = useSelector((state) => state.products);
return (
  <AppBar position="fixed">
    <Container maxWidth="md">
    <Toolbar
    style={{paddingLeft:'0px',
    paddingRight:'0px',}}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        
        justifyContent: "space-between",
      }}
    >
     
     <div>
     <Link to="/" >
      <img src={logo} width={50} style={{margin:'7px 0 0 0'}}  />
      </Link>
     </div>
       
     
     <div style={{ display:'flex', justifyContent: "space-between", width:'25%'}}>
      <Link to="/" style={{color:'#fff'}}>SHOP</Link>
      <Link to="/search" style={{color:'#fff'}}>SEARCH</Link>
      <Link to="/order-summary" style={{color:'#fff'}}>
      <Badge badgeContent={products.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
      </Link>
     </div>
    </Toolbar>
    </Container>
  </AppBar>
);
}
export default Header;