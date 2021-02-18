import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    list: {
        display: 'flex',
        justifyContent: 'space-around',
    }
})

const Categories = ({products}) => {
    const classes = useStyles();
    let [productsByCategory, setProductsByCategory] = useState([]);
    productsByCategory = [...products];



    // lists categories dynamically based on categories in database
    const filteredItems = productsByCategory.map(item => item.categories[0]);
    const getCategories = filteredItems.map(item => item.slug);
    const categories = [...(new Set(['all', ...getCategories]))];

    return (
        <main className={classes.root}>
            <h1>Sort By Category</h1>
            <div className={classes.list}>
                {categories.map(category => <IconButton>{category}</IconButton>)}
            </div>
        </main>
    )
}

export default Categories;
