import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import commerce from './lib/Commerce';

const App = () => {
    let [products, setProducts] = useState([]);
    let [cart, setCart] = useState([]);

    const fetchProducts = async () => {
        const res = await commerce.products.list();
        setProducts(res.data);
    }

    const fetchCart = async () => {
        const res = await commerce.cart.retrieve();
        setCart(res);
    }

    const addToCart = async (id, quantity) => {
        const res = await commerce.cart.add(id, quantity);
        setCart(res.cart);
    }

    const removeFromCart = async (id) => {
        const res = await commerce.cart.remove(id);
        setCart(res.cart);
    }

    const updateCart = async (id, quantity) => {
        const res = await commerce.cart.update(id, {quantity});
        setCart(res.cart);
    }

    const emptyCart = async () => {
        const res = await commerce.cart.empty();
        setCart(res.cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    if(!cart) return 'Loading...';

    return (
    
    <Router>
        <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path="/shop">
            <Navbar items={cart.total_items}/>
            <Shop products={products} add={addToCart}/>
        </Route>
        <Route exact path="/cart">
            <Navbar items={cart.total_items}/>
            <Cart cart={cart}
                remove={removeFromCart}
                update={updateCart}
                empty={emptyCart}
            />
        </Route>
        <Route path="*">
            <Error />
        </Route>
        </Switch>
     </Router>
    )
}

export default App;


