import React from 'react'
import './ProductsListingAll.css'
import {ProductCard} from '../../component/cards/ProductCard'
import productImage from '../../assets/books/a-book-1771073_640.jpg'
export const ProductsListingAll = ({books}) => {
    return (
        <section className='product-listing-all-container'>
            <div className="container">
                <div className="grid-container">
                    {books?.map((value,index) => {
                        return <div className="grid-item" key={index}>
                            <ProductCard
                                booksData={books}
                                bookImage={value?.published_works?.[0]?.cover_art_url}
                                bookId={value?.canonical_isbn}
                                bookAuthor={value.authors?.[0]}
                                bookName={value?.title}
                                bookPrice={Math.trunc(parseInt(value?.canonical_isbn) / 35451731256)}
                            />
                        </div>
                    })}
                </div>
            </div>
        </section>
    )
}
