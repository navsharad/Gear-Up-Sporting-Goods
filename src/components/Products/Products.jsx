import React, {useState, useEffect} from 'react';
import Product from './Product/Product';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import { Hidden, Typography, IconButton } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


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
    const [value, setValue] = useState(0); // used for material-ui tabs component displaying categories
    const [productsDisplayed, setProductsDisplayed] = useState([...products]);
    let productsArray = [...products];

    // lists categories dynamically based on categories in database
    const filteredItems = productsArray.map(item => item.categories[0]);
    // gets list of all possible categories
    const getCategories = filteredItems.map(item => item.slug);
    // creates array of categories using Set to eliminate duplicates and adds an all category to array
    const categories = [...(new Set(['all', ...getCategories]))];

    // handles items being displayed when user clicks on a different category
    const changeCategory = (cat) => {
        if (cat === 'all') {
           setProductsDisplayed(productsArray);
        } else {
            setProductsDisplayed(productsArray.filter(item => item.categories[0]['slug'] === cat));
        }
    }

    // handles changing tabs for categories list
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    

    
    return (<>
        <section className={classes.categories}>
        <h1>Sort By Category</h1>
        <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
        >
        {categories.map((currentCategory, index) => <Tab label={currentCategory} key={index} onClick={() => changeCategory(currentCategory)} />)}
        </Tabs>
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

