import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CartItem from '../../components/CartItem';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
      width: '100wv',
      height: '100vh',
      alignItems: 'center',
      background: '#C9D6FF',
      background: '-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)',
      background: 'linear-gradient(to right, #E2E2E2, #C9D6FF)',
    },
    title: {
      marginTop: '5%',
    },
    emptyButton: {
      minWidth: '150px',
      [theme.breakpoints.down('xs')]: {
        marginBottom: '5px',
      },
      [theme.breakpoints.up('xs')]: {
        marginRight: '20px',
      },
    },
    checkoutButton: {
      minWidth: '150px',
    },
    link: {
      textDecoration: 'none',
    },
    cardDetails: {
      display: 'flex',
      marginTop: '10%',
      width: '100%',
      justifyContent: 'space-between',
    },
  }));


const Cart = ({cart, empty, update, remove}) => {
    const classes = useStyles();

    // removes black background used for darker tint on video for home page
    document.body.style = 'background-color: transparent';

    //this is just a function returning jsx
    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your cart
        <Link to="/" className={classes.link}>Start adding some</Link>
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} update={update} remove={remove}/>
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    subtotal: {cart.subtotal.formatted_with_symbol} 
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={empty}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )

    

    return (
        <Container className={classes.root}>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shoppping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
