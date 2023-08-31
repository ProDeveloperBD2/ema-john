import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
const hanleAddToCart = props.hanleAddToCart;
    const{ name, img, seller, ratings, price} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <h6 className='product-name'>{name}</h6>
            <p className='price'>Price ${price}</p>
           <div className='seller-rate'>
           <p><span>Manufacturer</span>: {seller}</p>
            <p><span>Reting</span>: {ratings} start</p>
           </div>
            <button onClick={() => hanleAddToCart(props.product)} className='product-btn'>Add To Cart <FontAwesomeIcon icon={faShoppingCart} /></button>
        </div>
    );
};

export default Product;