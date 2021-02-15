import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Product from './components/Products/Product/Product'

import commerce from './lib/Commerce';

const App = () => {
    commerce.cart.retrieve().then((cart) => console.log(cart));

    return <Router>
        <Navbar />
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/shop">
            <Shop />
        </Route>
        <Route exact path="/cart">
            <Cart />
        </Route>
        <Route exact path="/cart">
            <Error />
        </Route>

    // </Router>
}

export default App;


