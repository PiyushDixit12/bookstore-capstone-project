import React from 'react'
import './Cart.css'
import {Navbar} from '../../layout/Navbar'
import {Footer} from '../../layout/footer/Footer'
import {CartItemsContainer} from '../../layout/cartitemContainer/CartItemsContainer'
export const Cart = () => {
    return (
        <section>
            <Navbar darkTheme={true} />
            <CartItemsContainer />
            <Footer />
        </section>
    )
}
