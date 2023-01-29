import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () =>{
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {

        setCart(await commerce.cart.retrieve());
    }

    const handlleAddToCart = async (productId, quantity) =>{
        const item = await commerce.cart.add(productId, quantity);

        setCart(item)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const  item  = await commerce.cart.update(productId, { quantity });
    
        setCart(item);
    };

    const handleRemoveFromCart = async (productId) =>{
        const  item  = await commerce.cart.remove(productId);
    
        setCart(item);
    }


    const handleEmptyCart = async (productId) =>{
        const  item  = await commerce.cart.empty(productId);
    
        setCart(item);
    }
    
    useEffect(() => {
        fetchProducts();
        fetchCart();
    },[])
    
    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Routes>
                    <Route path='/' element={<Products products = {products} onAddToCart = {handlleAddToCart}/>} />
                    <Route path='/cart' element={<Cart 
                    cart={cart} 
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart}
                    />} />
                    <Route path="/checkout" element={<Checkout 
                    Checkout={Checkout}
                    />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;
