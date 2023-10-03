import { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();
    const totalPage = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPage).keys()];
    const options = [5, 10, 20];
    // useEffect(() => {
    //     fetch('http://localhost:4000/products')
    //         .then(res => res.json())
    //         .then(data => setProduct(data))
    // }, []);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:4000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProduct(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage]);
    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);
        fetch(`http://localhost:4000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const saveCart = [];
                // step 1: get id of the addedProduct
                for (const id in storedCart) {
                    // step 2: get product from product state by using id
                    const addedProduct = cartProducts.find(product => product._id === id);
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
            })
    }, []);

    const hanleAddToCart = (product) => {
        //   system 2:
        let newCart = [];
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        //   system 2:
        addToDb(product._id)
    }
    const handleDeleteCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }
    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product key={product._id} product={product} hanleAddToCart={hanleAddToCart}></Product>)
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
            {/* pagination */}
            <div className='pagination'>
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;