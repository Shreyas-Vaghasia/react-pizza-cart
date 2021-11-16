import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { CartContext } from '../Pages/CartContex';
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '60%',
    margin: 'auto',
}));

export default function ProductRender({ product }) {
    const { cart, setCart } = useContext(CartContext)

    const [isAdding, setisAdding] = useState(false)

    const AddToCart = (e, product) => {
        e.preventDefault();

        let _cart = { ...cart }

        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1
        } else {
            _cart.items[product._id] = 1
        }

        if (_cart.totalItems) {
            _cart.totalItems += 1
        } else {
            _cart.totalItems = 1
        }
        setCart(_cart)
        setisAdding(true)

        setTimeout(() => {
            setisAdding(false)
        }, 1000)







    }
    console.log(cart)
    return (


        <Item sx={{ backgroundColor: "#E5890A", marginBottom: "10px" }}>
            <Link to={`/products/${product._id}`} style={{ color: 'inherit', textDecoration: "none" }} >
                <Box sx={{ textAlign: 'center' }}>
                    <img src={product.image} alt={product.name} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <Button onClick={
                        (e) => { AddToCart(e, product) }}
                        disabled={isAdding}
                        variant="outlined"
                        sx={{ backgroundColor: `${isAdding ? "" : "#B05E27"}`, color: "yellow" }} >
                        Add{isAdding ? "ing" : ""}

                    </Button>

                </Box>
            </Link>
        </Item>

    )
}
