import React from 'react';
import Product from './Product/Product';
import Grid from "@material-ui/core/Grid";

const Products = () => {
    return (
        <div>
        <Grid container spacing={1}>
            {Items.map((item) => <Product />)}
      </Grid>
        </div>
    )
}

export default Products
