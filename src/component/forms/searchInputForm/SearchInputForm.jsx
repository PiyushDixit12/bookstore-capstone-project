import React from 'react'
import './SearchInputForm.css'
export const SearchInputForm = ({darkShadow,onInputChange,onSearchClick,searchInputPlaceHolder,defaultValue}) => {
    return (
        <div className={`${darkShadow ? 'dark-shadow' : 'light-shadow'} search-input-form-container`}>
            <input type="text" className='search-input' defaultValue={defaultValue ?? ""} placeholder={searchInputPlaceHolder} onChange={(e) => onInputChange(e)} />
            <button className='search-button' onClick={(e) => onSearchClick(e)} > Search</button>
        </div>
    )
}
