import React from 'react';
import './ReviewItems.css'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReviewItems = ({ product, handleRemoveFromCart }) => {
    const { id, img, name, price, quantity } = product;
    return (
        <div className='review-items'>
            <div className='image-text'>
                <div className='review-image'>
                    <img className='img' src={img} alt="" />
                </div>
                <div className='review-text'>
                    <h3>{name}</h3>
                    <h4>Price: <span>${price}</span></h4>
                    <h4>Order Quantity: <span>{quantity}</span></h4>
                </div>
            </div>
            <div className='review-btn'>
                <button className='delete-btn' onClick={() => handleRemoveFromCart(id)}><FontAwesomeIcon className='delete-icon' icon={faTrashAlt} /></button>
            </div>
        </div>
    );
};

export default ReviewItems;