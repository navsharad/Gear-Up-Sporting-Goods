import React, {useState, useEffect} from 'react';
import Product from './Product/Product';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import { Hidden, Typography, IconButton } from '@material-ui/core';
import Loading from '../Loading';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    grid: {
        width: '100%',
        margin: '0px',
    },
    categories: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%',
    }
}));

const Products = ({products, add}) => {
    const classes = useStyles();
    const [productsDisplayed, setProductsDisplayed] = useState([...products]);
    const [loading, setLoading] = useState(true);
    let productsArray = [...products];
    console.log(products)

    // lists categories dynamically based on categories in database
    const filteredItems = productsArray.map(item => item.categories[0]);
    // gets list of all possible categories
    const getCategories = filteredItems.map(item => item.slug);
    // creates array of categories using Set to eliminate duplicates and adds an all category to array
    const categories = [...(new Set(['all', ...getCategories]))];

    const changeCategory = (cat) => {
        if (cat === 'all') {
           setProductsDisplayed(productsArray);
        } else {
            setProductsDisplayed(productsArray.filter(item => item.categories[0]['slug'] === cat));
        }
    }

    
    return (<>
        <section className={classes.categories}>
        <h1>Sort By Category</h1>
        <div className={classes.list}>
            {categories.map((currentCategory, index) => <IconButton key={index} onClick={() => changeCategory(currentCategory)}>{currentCategory}</IconButton>)}
        </div>
        </section>
        <div className={classes.root}>
        <Grid container spacing={8} alignItems='center' className={classes.grid}>
            {productsDisplayed.map((item) => <Product key={item.id} item={item} add={add}/>)}
      </Grid>
        </div>
        </>
    )
}


export default Products;

