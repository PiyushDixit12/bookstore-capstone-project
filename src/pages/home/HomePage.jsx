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

                    <svg className='waves-container' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222222" fill-opacity="1" d="M0,224L34.3,224C68.6,224,137,224,206,218.7C274.3,213,343,203,411,192C480,181,549,171,617,176C685.7,181,754,203,823,197.3C891.4,192,960,160,1029,133.3C1097.1,107,1166,85,1234,80C1302.9,75,1371,85,1406,90.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
                </div>
            </section>
            {/* <ProductListing /> */}
            <Footer />
        </>
    )
}
