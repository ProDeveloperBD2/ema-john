import React from 'react';
import './Cart.css'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = ({ cart, handleDeleteCart, children }) => {
    /* const {length} = props.cart; */
    console.log(cart)
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for (const product of cart) {
        //  system 1:
        /*    if(product.quantity ===0){
               product.quantity = 1
           } */
        //  system 1:
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping * product.quantity;
        quantity = quantity + product.quantity
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
            <button className='clear-cart-btn' onClick={handleDeleteCart}>
                Clear Cart
                <FontAwesomeIcon className='cart-delete-icon' icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;