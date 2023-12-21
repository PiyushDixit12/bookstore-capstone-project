import React,{useEffect,useState} from 'react'
import './ProductListing.css'
import productImage from '../../assets/books/a-book-1771073_640.jpg'
import {ProductCard} from '../../component/cards/ProductCard'
import {books,fetchData} from '../../utils/BookData'

// const productData = [
//     {
//         bookImage: productImage,
//         bookName: "Romeo and Juliet",
//         authorName: "William Shakespeare",
//         bookPrice: 300,
//     },
//     {
//         bookImage: productImage,
//         bookName: "Romeo and Juliet",
//         authorName: "William Shakespeare",
//         bookPrice: 300,
//     },
//     {
//         bookImage: productImage,
//         bookName: "Romeo and Juliet",
//         authorName: "William Shakespeare",
//         bookPrice: 300,
//     },
//     {
//         bookImage: productImage,
//         bookName: "Romeo and Juliet",
//         authorName: "William Shakespeare",
//         bookPrice: 300,
//     },
//     // {
//     //     bookImage: productImage,
//     //     bookName: "Romeo and Juliet",
//     //     authorName: "William Shakespeare",
//     //     bookPrice: 300,
//     // },

// ];
export const ProductListing = () => {
    const [booksData,setBooksData] = useState();
    useEffect(() => {
        console.log("fetching data");
        setBooksData(fetchData());
    },[])
    return (
        <div className='product-listing-container'>
            <div className="container">
                <h2> here some
                    <span className='text-primary'>books</span> that you might like
                </h2>

                <div className="listing-container">
                    {booksData?.length && booksData?.slice(0,4)?.map((value,index) => {
                        return (
                            <ProductCard
                                key={value.canonical_isbn}
                                bookId={value.canonical_isbn} bookName={value.title} bookImage={productImage} bookAuthor={value.authors?.[0]} bookPrice={Math.trunc((value.canonical_isbn) / 300)} />
                        )
                    })}
                </div>
            </div></div>
    )
}
