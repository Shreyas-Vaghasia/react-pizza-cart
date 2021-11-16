import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../Pages/CartContex';

export default function NavBar() {
    const { cart, setCart } = useContext(CartContext)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#9D5C0D' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <LocalPizzaIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pizza
                    </Typography>
                    <Link to="/" style={{ color: 'inherit', textDecoration: "none" }} >
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/products" style={{ color: 'inherit', textDecoration: "none" }}>
                        <Button color="inherit">Product</Button>
                    </Link>

                    <Link to="/cart" style={{ color: 'inherit', textDecoration: "none" }}>
                        <Button endIcon={<ShoppingCartIcon />} color="inherit">{cart.totalItems ? cart.totalItems : 0}</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
