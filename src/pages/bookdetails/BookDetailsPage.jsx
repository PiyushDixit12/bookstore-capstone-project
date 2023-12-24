import React from 'react'
import {Navbar} from '../../layout/Navbar'
import {ProductDetail} from '../../layout/productdetails/ProductDetail'
import {Footer} from '../../layout/footer/Footer'

export const BookDetailsPage = () => {
    return (
        <section data-testid="book-details-page">
            <Navbar darkTheme={true} />
            <ProductDetail />
            <Footer />
        </section>
    )
}
