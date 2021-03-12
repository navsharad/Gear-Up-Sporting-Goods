import React from 'react';
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';
import { Add, Remove} from '@material-ui/icons';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    media: {
      height: 260,
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cartActions: {
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'red',
      color: 'white',
    }
  }));


const CartItem = ({item, remove, update}) => {
    const classes = useStyles();

    return (
        <Card>
          <CardMedia image={item.media.source} alt={item.name} className={classes.media} />  
          <CardContent className={classes.cardContent}>
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
          </CardContent>
          <CardActions className={classes.cartActions}>
              <div className={classes.buttons}>
                  <Button type="button" size="small" onClick={() => update(item.id, item.quantity - 1)}><Remove/></Button>
                  <Typography>{item.quantity}</Typography>
                  <Button type="button" size="small" onClick={() => update(item.id, item.quantity + 1)}><Add/></Button>
              </div>
              <Button className={classes.button} variant="contained" type="button" onClick={()=> remove(item.id)}>Remove</Button>
          </CardActions>
        </Card>
    )
}

export default CartItem
