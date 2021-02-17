import React from 'react';
import logo from '../assets/logo.png';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        background: '#7db9e8',
        background: '-moz-radial-gradient(center, ellipse cover, #7db9e8 0%, #21374b 100%)',
        background: '-webkit-radial-gradient(center, ellipse cover, #7db9e8 0%,#21374b 100%)',
        background: 'radial-gradient(ellipse at center, #7db9e8 0%,#21374b 100%)',
        margin: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingLogo: {
        fontSize: '5rem',
        animation: '$jump 4s infinite',
    },
    '@keyframes jump': {
        '0%': { transform: 'translateY(-30%)' },
        '50%': { transform: 'translateY(30%)' },
        '100%': { transform: 'translateY(-30%)' },
    },
})

const Loading = () => {
    const classes = useStyles();

    const root = {
        background: '#7db9e8',
        background: '-moz-radial-gradient(center, ellipse cover, #7db9e8 0%, #21374b 100%)',
        background: '-webkit-radial-gradient(center, ellipse cover, #7db9e8 0%,#21374b 100%)',
        background: 'radial-gradient(ellipse at center, #7db9e8 0%,#21374b 100%)',
        margin: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    return (
        <main className={classes.root}>
            <div className={classes.loadingLogo}>
                <img src={logo} alt="loading..."/>
            </div>
        </main>

    )
}

export default Loading;
