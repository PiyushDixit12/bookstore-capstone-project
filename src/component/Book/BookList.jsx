// BookList.js

import React,{useState} from 'react';
import './BookList.css';

export const BookList = ({books}) => {
    const [searchTerm,setSearchTerm] = useState('');
    const [search,setSearch] = useState('');
    const [sortOption,setSortOption] = useState('default');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const filterBooks = () => {
        let filteredBooks = books;

        if(search) {
            filteredBooks = filteredBooks.filter(
                (book) =>
                    book.name.toLowerCase().includes(search.toLowerCase()) ||
                    book.author.toLowerCase().includes(search.toLowerCase())
            );
        }

        if(sortOption !== 'default') {
            filteredBooks.sort((a,b) => {
                if(sortOption === 'name') {
                    return a.name.localeCompare(b.name);
                } else if(sortOption === 'price') {
                    return a.price - b.price;
                } else if(sortOption === 'author') {
                    return a.author.localeCompare(b.author);
                }
                return 0;
            });
        }

        return filteredBooks;
    };

    const sortedAndFilteredBooks = filterBooks();

    return (
        <div className="book-list">
            <div className="search-and-sort">
                <div className=' flex'>
                    <input
                        type="text"
                        placeholder="Search by name or author"
                        value={searchTerm}
                        className=' input-field'
                        onChange={handleSearch}
                    />
                    <button className='btn' onClick={() => {setSearch(searchTerm)}}> Search</button>
                </div>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="default">Sort By</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price</option>
                    <option value="author">Author (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="priceDesc">Price (High to Low)</option>
                    <option value="authorDesc">Author (Z-A)</option>
                </select>
            </div>

            <ul>
                {sortedAndFilteredBooks?.map((book) => (
                    <li key={book.id}>
                        <strong>{book.name}</strong> by {book.author}, ${book.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

