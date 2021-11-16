import { useParams } from 'react-router-dom'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../Pages/CartContex';

export default function Product() {
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
    const { cart, setCart } = useContext(CartContext)

    const [isAdding, setisAdding] = useState(false)

    let navigate = useNavigate();

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '60%',
        margin: 'auto',
    }));
    let [product, setProduct] = React.useState([]);
    const { _id } = useParams();
    console.log(_id);


    React.useEffect(() => {
        fetch(`https://star-spark-pasta.glitch.me/api/products/${_id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    return (
        <div >


            <Item sx={{ display: "flex", marginTop: "10%" }}>
                <Button onClick={() => { navigate(-1) }} variant="contained" color="primary" component={Link} to="/">
                    Back
                </Button>
                <Box sx={{ textAlign: 'center', marginRight: "10%" }}>
                    <img src={product.image} alt={product.name} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <h2>{product.name}</h2>

                    <h2>{product.size}</h2>
                    <h2>₹{product.price}</h2>

                    <Button onClick={
                        (e) => { AddToCart(e, product) }}
                        disabled={isAdding}
                        variant="outlined"
                        sx={{ backgroundColor: `${isAdding ? "" : "#B05E27"}`, color: "yellow" }} >
                        Add{isAdding ? "ing" : ""}

                    </Button>

                </Box>
            </Item>
        </div>
    )
}
