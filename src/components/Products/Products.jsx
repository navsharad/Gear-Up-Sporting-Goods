import React from 'react';
import Product from './Product/Product';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100wv',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#C9D6FF',
        background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
        background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
    },
    grid: {
        width: '100%',
        margin: '0px',
    }
}));

const Products = ({products, add}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            
        <Grid container spacing={8} alignItems='center' className={classes.grid}>
            {products.map((item) => <Product key={item.id} item={item} add={add}/>)}
      </Grid>
        </div>
    )
}

export default Products
