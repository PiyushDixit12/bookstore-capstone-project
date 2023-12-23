import React from 'react'
import Nodatafoundimg from '../../assets/noBookDataFound.jpg'
import './NoDataFound.css'
export const NoDataFound = () => {
    return (
        <div className='No-Data-Available-container' > <img src={Nodatafoundimg} alt="" width="100%" height={"100%"} /> </div>
    )
}
