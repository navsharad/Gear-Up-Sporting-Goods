import React from 'react';
import logo from '../assets/altLogo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { ShoppingCart } from '@material-ui/icons';
import { Badge, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffa3b1',
    width: '100%',
    borderBottom: '3px solid dodgerblue',
  },
  appBar: {
    background: 'navy',
    height: '14vh',
  },

  title: {
    width: '90vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function ButtonAppBar({items}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.title}>
            <Link to="/shop">
                <img src={logo} alt="simplicity"></img>
            </Link>

            <Link to="/cart">
                <IconButton>
                  <Badge color="secondary" badgeContent={items}>
                  <ShoppingCart fontSize="large" style={{color: 'white'}}/>
                  </Badge>
                </IconButton>
            </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}