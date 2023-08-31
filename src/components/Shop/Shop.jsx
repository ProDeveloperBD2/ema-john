import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    const [products, setProduct]=useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[]);
    const [cart, setCart]= useState([]);
    const hanleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product key={product.id} product={product} hanleAddToCart={hanleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <h2>Order Summary</h2>
                <p>Selected Items: {cart.length}</p>
            </div>
        </div>
    );
};

export default Shop;