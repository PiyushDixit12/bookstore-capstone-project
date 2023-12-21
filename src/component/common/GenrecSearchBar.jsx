// GenreSearchBar.js

import React from 'react';
import {NavLink} from 'react-router-dom';
import './GenreSearchBar.css';

export const GenreSearchBar = () => {
    return (
        <nav className="genre-search-bar">
            <NavLink to="/genre/fiction">Fiction</NavLink>
            <NavLink to="/genre/non-fiction">Non-Fiction</NavLink>
            <NavLink to="/genre/poetry">Poetry</NavLink>
            {/* Add more genres as needed */}
        </nav>
    );
};

