import React from 'react'
import './HomePage.css'
import {Navbar} from '../../layout/Navbar'
import {SearchInputForm} from '../../component/forms/searchInputForm/SearchInputForm'
import {ProductListing} from '../../layout/productListing/ProductListing'
import {Footer} from '../../layout/footer/Footer'
export const HomePage = () => {
    return (
        <>
            <section className='showcase-container'>
                <Navbar darkTheme={false} />
                <div className='overlay' data-testid="overlay"></div>
                <div className='showcase-content'>

                    <h1 data-testid="rome-without-h1"> A Room Without <span className=' text-primary' data-testid="span-book"> Books </span> is </h1><h1>  Like a Body Without Soul</h1>
                    {/* <h1> Best <span className=' text-primary'> Books</span>  Available </h1>
                    <p>buy quality books at cheaper price</p>
                    <SearchInputForm darkShadow={true}
                        onInputChange={(e) => {}}
                        onSearchClick={(e) => {}} /> */}
                </div>
            </section>
            {/* <ProductListing /> */}
            <Footer />
        </>
    )
}
