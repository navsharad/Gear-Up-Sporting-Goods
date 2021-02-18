import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Products from '../../components/Products/Products';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: '100wv',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#C9D6FF',
      background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
      background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',

    },
  }));

  // fix prop drilling w/ context

const Shop = ({products, add}) => {
    const classes = useStyles();

      // removes black background used for darker tint on video for home page
      document.body.style = 'background-color: transparent';

    return (
        <div className={classes.root}>
          <Products products={products} add={add}/>
        </div>
    )
}

export default Shop;
