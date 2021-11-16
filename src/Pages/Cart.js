import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useState } from 'react';
import { CartContext } from '../Pages/CartContex';
import Button from '@mui/material/Button';
import emptycart from './emptycart.png';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Cart() {
    let [products, setProducts] = React.useState([]);

    const { cart, setCart } = useContext(CartContext)

    console.log("CArt", cart)
    console.log("Prdo", products)


    React.useEffect(() => {

        if (!cart.items) {
            return;
        }
        console.log(Object.keys(cart.items));

        fetch('https://ecom-rest-apis.herokuapp.com/api/products/cart-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: Object.keys(cart.items) })
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                console.log("Products", products)

                console.log("niside", data)
            })
    }, [cart])






    const increment = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = { ...cart };
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        console.log("insedie +", _cart)
        setCart(_cart);
    }

    const decrement = (productId) => {
        const existingQty = cart.items[productId];
        if (existingQty === 1) {
            return;
        }
        const _cart = { ...cart };
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);

    }
    const getPrice = (productId, price) => {
        const existingQty = cart.items[productId];

        total = total + (existingQty * price)
        return existingQty * price;

    }
    const deleteItem = (productId) => {
        const _cart = { ...cart };

        const existingQty = cart.items[productId];

        delete _cart.items[productId];
        _cart.totalItems -= existingQty;
        setCart(_cart);
    }
    const handleOrder = () => {
        window.alert("Order Placed")
        setCart({})
        setProducts([])
    }



    let total = 0;





    return (

        !products.length
            ? <div sx={{display: 'flex',margin: 'auto'}}>
                <img src={emptycart} alt="Empty Cart"  /></div>
            :
            <div >
                <h1>Cart Items</h1>

                <div>
                    {

                        products?.map(product => {
                            return (

                                <Stack
                                    sx={{ display: 'flex', alignItems: 'center', margin: '10px', marginLeft: '30%' }}
                                    direction="row"
                                    spacing={2}

                                >
                                    <Item><img src={product.image} alt={product.name} height="150px" /></Item>

                                    <Item sx={{ width: "10%" }}>{product.name}</Item>

                                    <Item sx={{ width: "5%" }} >₹{getPrice(product._id, product.price)}</Item>

                                    <ToggleButton value="left" aria-label="left aligned" onClick={() => { decrement(product._id) }}>
                                        <RemoveIcon />
                                    </ToggleButton>
                                    <Item sx={{ width: "5%" }} >{cart.items[product._id]}</Item>

                                    <ToggleButton value="left" aria-label="left aligned" onClick={() => { increment(product._id) }}>
                                        <AddIcon />
                                    </ToggleButton>
                                    <ToggleButton value="left" aria-label="left aligned" onClick={() => { deleteItem(product._id) }}>
                                        <DeleteIcon color={"error"} />
                                    </ToggleButton>



                                </Stack>




                            )
                        })
                    }
                    <hr />
                    <Stack
                        sx={{ display: 'flex', alignItems: 'center', margin: '10px', marginLeft: '30%' }}
                        direction="row"
                        spacing={35}
                    >
                        <Item><h3>Total</h3></Item>
                        <Item sx={{ width: "5%" }} >₹{total}</Item>
                        <Button onClick={() => { handleOrder() }} variant="contained" color="error">Order Now</Button>

                    </Stack>



                </div>




            </div >
    )
}


