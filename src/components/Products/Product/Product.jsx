import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {AddShoppingCart, Add, Remove} from '@material-ui/icons';
import {Grid, IconButton} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  media: {
    height: 350,
    backgroundSize: 'contain',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  shoppingCart: {
    display: 'flex',
    justifySelf: 'flex-end',
  }
  
}));

const Product = ({item, add}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  // strip html tags from api response
  const desc = item.description.replace(/(<([^>]+)>)/gi, "");

console.log(item)
  return (
    <Grid item xs={12} md={6} lg={4}>
    <Card elevation="8" className={classes.root}>
        <CardMedia
          className={classes.media}
          image={item.media.source}
          title={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {item.price.formatted_with_symbol}
          </Typography>
        </CardContent>
      <CardActions className={classes.cardActions}>
        <div>
        <IconButton onClick={() =>  quantity > 1 && setQuantity(quantity - 1)}>
          <Remove />
        </IconButton>
        {quantity}
        <IconButton onClick={() => setQuantity(quantity + 1)}>
          <Add />
        </IconButton>
        </div>
        <IconButton className={classes.shoppingCart} onClick={() => add(item.id, quantity)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
    </Grid>
  );
}

export default Product;
