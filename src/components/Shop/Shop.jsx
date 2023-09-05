import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from product state by using id
            const addedProduct = products.find(product => product.id === id);
            console.log(addedProduct)
            if (addedProduct) {
                // step 3: get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity
                // step 4: add the added product to the save cart
                saveCart.push(addedProduct)
            }

        }
        //    step 5
        setCart(saveCart)
    }, [products]);

    const hanleAddToCart = (product) => {
        //   system 2:
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        //   system 2:
        addToDb(product.id)
    }
    const handleDeleteCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product key={product.id} product={product} hanleAddToCart={hanleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    handleDeleteCart={handleDeleteCart}
                >
                    <Link to="/orders">
                        <button className='review-order-btn'>
                            Review Order
                            <FontAwesomeIcon className='review-order-icon' icon={faArrowRight} />
                        </button>
                    </Link>
                </Cart>
            </div>
        </div >
    );
};

export default Shop;