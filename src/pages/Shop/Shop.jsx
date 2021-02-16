import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Products from '../../components/Products/Products';

const useStyles = makeStyles((theme) => ({
    root: {
      background: '#ffa3b1',
      width: '100vw',
    },
    appBar: {
      background: '#d48c97',
      height: '15vh',
    },
  
    title: {
      width: '90vw',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  // fix prop drilling w/ context

const Shop = ({products, add}) => {
    return (
        <Products products={products} add={add}/>
    )
}

export default Shop;
