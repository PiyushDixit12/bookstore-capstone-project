import React from 'react'
import SomeThingWrongimg from '../../assets/somethingwentWrong.png'
import './SomeThingWrong.css'
export const SomeThingWrong = () => {
    return (
        <div className='something-wrong-container'>
            <img src={SomeThingWrongimg} alt="" width={"100%"} />
            <h3 style={{textAlign: "center"}}>something went wrong </h3>
        </div>
    )
}
