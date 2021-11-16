import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { CartContext } from '../Pages/CartContex';
import ProductRender from './ProductRender';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '60%',
    margin: 'auto',
}));

export default function Products() {

    const { cart, setCart } = useContext(CartContext)

    const [isAdding, setisAdding] = useState(false)


    const AddToCart = (e, product) => {
        e.preventDefault();

        let _cart = { ...cart }

        if (!_cart.items) {
            _cart.items = []
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

    let [products, setProducts] = React.useState([]);



    React.useEffect(() => {
        fetch('https://star-spark-pasta.glitch.me/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);



    return (
        <>
            <Typography sx={{ marginLeft: "5%" }} variant="h3" gutterBottom component="div">
                Products
            </Typography>
            <Box sx={{ width: '100%', }}>
                <Grid container spacing={2}>
                    {
                        products.map(product => (


                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} >
                                <ProductRender product={product} />
                            </Grid>

                        ))}
                </Grid>

            </Box>
        </>
    )
}

