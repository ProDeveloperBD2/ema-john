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
    const hanleAddToCart = (product) => {
        console.log('added Products',product)
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
            </div>
        </div>
    );
};

export default Shop;