import React from 'react';
import {SentimentDissatisfied} from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '70vh',
    },
    icon: {
        fontSize: '10rem',
        color: 'red',
    },
    text: {
        maxWidth: '70vw',
        textAlign: 'center',
        fontSize: '1.5rem',
    },
    button: {
        fontSize: '1.2rem',
        padding: '15px',
        width: '250px',
        backgroundColor: 'transparent',
        border: '2px solid rgb(101, 245, 221)',
        outline: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: '0.3s ease-in-out',
        '&:hover': {
            letterSpacing: '5px',
        }
    }
}))

const Error = () => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <SentimentDissatisfied className={classes.icon} />
            <h1>404 Page Not Found</h1>
            <p className={classes.text}>The page you're looking for does not exist. Press the button below to return home.</p>
            <Link to="/"><button className={classes.button}>Return Home</button></Link>
        </main>
    )
}

export default Error;
