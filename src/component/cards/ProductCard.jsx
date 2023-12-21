import React from 'react'
import './ProductCard.css'
import {NavLink} from 'react-router-dom'
export const ProductCard = ({bookId,bookName,bookImage,bookAuthor,bookPrice,bookPages,booksData}) => {
    return (
        <div className="product-listing-card">
            <div className="product-listing-img-container">
                <img src={bookImage} className='product-listing-image' />
            </div>
            <div className='product-listing-details-container'>
                <h3>{bookName}</h3>
                <p className='author-name'>{bookAuthor}</p>
                <p className='pricing'>&#8377; {bookPrice}</p>

            </div>
            <div className='card-button-container'>
                <NavLink to={`/book-details/${JSON.stringify({id: bookId,author: bookAuthor,title: bookName})}`} className='product-listing-button'> Show More</NavLink></div>
        </div>

    )
}
