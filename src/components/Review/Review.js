import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import productData from '../../fakeData/products.json'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./Review.css"
import happyImage from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';



const Review = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const handleProceedCheckout = () => {
        navigate('/shipment')
    }

    const removeProduct = (id) => {
        const newCart = cart.filter(i => i.id !== id);
        setCart(newCart)
        removeFromDb(id)
    }
    useEffect(() => {
        //cart
        const savedCart = getShoppingCart()
        const productIds = Object.keys(savedCart);
        const cartProducts = productIds.map(id => {
            const product = productData.find(i => i.id === id)
            product.quantity = savedCart[id]
            return product;
        });
        setCart(cartProducts);

    }, [])
    let thankyou;
    if (orderPlaced) {
        thankyou = <img style={{ width: '80%', margin: '10px', padding: '10px', borderRadius: '30px' }} src={happyImage} alt='happyimage' />
    }
    else { }
    return (
        <div className='Review'>
            <div>
                {
                    cart.map(i => <ReviewItem removeProduct={removeProduct} key={i.id} product={i}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button className='main-button' onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>


        </div>
    );
};

export default Review;