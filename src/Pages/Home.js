import React from 'react'
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import logo from "./logo.png"
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../Pages/CartContex';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '10px',
        margin: "auto",
        marginTop: "5%",



    },
});

export default function Home() {
    const classes = useStyles();
    const { name } = useContext(CartContext)
    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h5" gutterBottom component="div">
                    Are you Hungry ?{name}
                </Typography>
                <Typography variant="h2" gutterBottom component="div">
                    Dont Wait...!
                </Typography>
                <Link to="/products" style={{ color: 'inherit', textDecoration: "none" }}>

                    <Button variant="outlined" >Order Now</Button>
                </Link>
            </div>
            <div>
                <img src={logo} alt="logo" />
            </div>
        </div>
    )
}
