import React from 'react';
import './homeStyles.css';
import logo from '../../assets/logo.png';
import facebook from '../../assets/facebook.png';
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';
import videoBackground from '../../assets/homeBackground.mp4';
import { Link } from 'react-router-dom';

const Home = () => {
    // gives background video a darker tint
    document.body.style = 'background-color: black';
    return (
        <main className="main">
            <video src={videoBackground} muted loop autoPlay width="500" height="500"></video>

            <div className="content">
                <img className="logo" src={logo} alt=""/>
                <div className="text">
                    <h1 className="title-text">Sporting Goods</h1>
                    <h2 className="subtitle-text">At An Affordable Price</h2>
                    <p className="info-text">Sports can get expensive, at Gear Up Sporting Goods we believe everyone should be able to afford equipment to play the sports they love. We offer sports equipment at amazing prices, all without sacrificing the quality!</p>
                    <Link to="/shop"><button className="shop-button">Shop Now</button></Link>
                </div>
                <div className="social-links">
                    <ul>
                        <li><a href="https://www.facebook.com" target="_blank"><img className="icon" src={facebook} alt="facebook"/></a></li>
                        <li><a href="https://www.twitter.com" target="_blank"><img className="icon" src={twitter} alt="twitter"/></a></li>
                        <li><a href="https://www.linkedin.com" target="_blank"><img className="icon" src={linkedin} alt=""/></a></li>
                    </ul>
                </div>
                </div>
        </main>
    )
}

export default Home;
