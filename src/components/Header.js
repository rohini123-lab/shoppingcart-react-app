import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import logo from "../logo-anu-mart.png";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header() {
  const products = useSelector((state) => state.products);
  const [searchValue, setsSearchValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setsSearchValue(event.target.value);
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="md">
        <Toolbar
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to="/">
              <img src={logo} width={50} style={{ margin: "7px 0 0 0" }} />
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Search>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleChange}
                inputProps={{ "aria-label": "search", name: "q" }}
              />
            </Search>
            <IconButton
              aria-label="delete"
              color="inherit"
              variant="outlined"
              size="large"
            >
              <SearchIcon onClick={() => navigate(`search/${searchValue}`)} />
            </IconButton>

            <Link to="/order-summary" style={{ color: "#fff" }}>
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
