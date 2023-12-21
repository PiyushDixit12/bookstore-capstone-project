import React,{useContext} from 'react'
import './CartItemsContainer.css'

import {CartItemCard} from '../../component/cards/cartItemsCard/CartItemCard'
import StripeCheckout from 'react-stripe-checkout'
import {useNavigate} from 'react-router-dom'
import {path} from '../../routes/RouteConstant'
import {useSelector} from 'react-redux'
const stripeKey = 'pk_test_51OONTjSFUXCQiIloeCA2pircU0F1E6N2wzwEahk9c3RkePIqY0M0qTMzrsczsSYyjeK4X3TNlGoOqjGrD4o6vC4800fsvzzEoO';
export const CartItemsContainer = () => {
    const navigate = useNavigate();
    const {cartItem,totalAmount} = useSelector(state => {
        console.log("cartitems containr",state.cart);
        return state.cart;
    })
    console.log(cartItem);
    const onToken = (token) => {
        console.log("token",token);
        alert("your Payment has been proccessed");
        navigate(path.BooksPage.path);
    }
    return (
        <section className='cart-items-container'>
            <div className="container">
                {totalAmount === 0 ? (
                    <h2>Currently cart is empty</h2>
                ) : (<>
                    <h2> Cart</h2>

                    {cartItem && cartItem?.map((book) => {
                        return <CartItemCard key={book?.id} bookData={book} />
                    })}
                    <h2>Total Amount = &#8377;{totalAmount}</h2>


                    <StripeCheckout
                        name='Book Checkout'
                        description='Please fill in the details below'
                        currency='INR'
                        amount={totalAmount * 100}
                        billingAddress
                        stripeKey={stripeKey}
                        token={onToken}
                    >   <button className='button-primary'>Procced to Checkout</button></StripeCheckout>
                </>)
                }
            </div >

        </section >
    )
}
