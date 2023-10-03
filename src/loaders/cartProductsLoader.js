import { getShoppingCart } from "../utilities/fakedb";

// const cartProductsLoader = async () => {
//     const loadedProducts = await fetch('products.json');
//     const products = await loadedProducts.json();
//     // if cart data is in database, you have to use async aeait
//     const storedCart = getShoppingCart();
//     const savedCart = [];
//     for (const id in storedCart) {
//         const addedProduct = products.find(pd => pd._id === id)
//         if (addedProduct) {
//             const quantity = storedCart[id];
//             addedProduct.quantity = quantity;
//             savedCart.push(addedProduct);
//         }
//     }
//     return savedCart;
// }

const cartProductsLoader = async () => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids);
    const loadedProducts = await fetch(`http://localhost:4000/productsByIds`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();

    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id)
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct)
        }

    }
    return savedCart;
}


export default cartProductsLoader;