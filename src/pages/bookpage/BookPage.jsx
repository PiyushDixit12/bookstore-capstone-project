import React,{useEffect,useState} from 'react'
import {Navbar} from '../../layout/Navbar'
import {SearchInputForm} from '../../component/forms/searchInputForm/SearchInputForm'
import './BookPage.css'
import {ProductsListingAll} from '../../layout/allProducts/ProductsListingAll'
import {Footer} from '../../layout/footer/Footer'
import {books,fetchData} from '../../utils/BookData'
import {useDispatch,useSelector} from 'react-redux'
import {addAllBooks,getAllBooks} from '../../redux/BookSlice'
import {GenreSearchBar} from '../../component/common/GenrecSearchBar'
import {useGetAllBooksQuery} from '../../service/bookService'
import {Loader} from '../../component/loader/Loader'
export const BookPage = () => {

    const dispatch = useDispatch();
    const [searchName,setSearchName] = useState("");
    const [handleName,setHandleName] = useState("");
    const [searchAuthorName,setSearchAuthorName] = useState("");
    const [handleAuthorName,setHandleAuthorName] = useState("");

    const [searchCategoriesName,setSearchCategoriesName] = useState("");
    const [searchType,setSearchType] = useState("fiction");

    const dataToSearch = {
        authors: searchAuthorName,
        title: searchName,
        book_type: searchType,
        book_categories: searchCategoriesName,
    }
    const {data: books,isLoading: booksLoading,isError: booksError,isFetching: booksFetching} = useGetAllBooksQuery(dataToSearch);
    const [filterBooks,setFilterBooks] = useState([]);

    const data = useSelector((state) => {
        console.log("====================================",state);
        return state;
    })
    useEffect(() => {
        console.log(books)
        console.log("book-data=======================================",books);
        setFilterBooks(books?.results);
        dispatch(addAllBooks(books?.results));
    },[books]);

    const onSearchName = (name) => {
        setSearchAuthorName("");
        setSearchCategoriesName();
        setSearchType("");
        setSearchName(name)
    };
    const onSearchAuthorName = (name) => {
        setSearchAuthorName(name);
        setSearchCategoriesName("");
        setSearchType("");
        setSearchName("")
    };
    const onSearchCategoriesName = (name) => {
        setSearchAuthorName("");
        setSearchCategoriesName(name);
        setSearchType("");
        setSearchName("")
    };
    const onSearchTypeName = (name) => {
        setSearchAuthorName("");
        setSearchCategoriesName("");
        setSearchType(name);
        setSearchName("")
    };
    return (
        <section>
            <Navbar darkTheme={true} />
            {/* <GenreSearchBar /> */}
            <div className='search-container '>
                <div className="search-container-text">
                    <h2>Find the <span className='text-primary'>Books</span> that you want </h2>
                </div>

                <div className="container">
                    {booksLoading || booksFetching ? <Loader /> : null}
                    {booksError ? <>something went wrong while fetch data</> : null}
                    {!booksLoading && !booksFetching ? <div className="search-input-container">
                        <div className='search-name-author-container'>
                        <div className="search-name-container">
                            <SearchInputForm darkShadow={false} searchInputPlaceHolder={"Search books by name"} defaultValue={handleName} onInputChange={(e) => {setHandleName(e.target.value)}} onSearchClick={() => onSearchName(handleName)} />
                        </div>
                            {/* <div className='search-author-price-container'> */}
                            <div className="search-author-container" >
                                <SearchInputForm darkShadow={false} searchInputPlaceHolder={"Search books by author"} defaultValue={handleAuthorName} onInputChange={(e) => {setHandleAuthorName(e.target.value)}} onSearchClick={() => onSearchAuthorName(handleAuthorName)} />
                            </div>
                        </div>
                        <div className='search-categories-type-container'>
                            <div className="search-categories-container">
                                {/* <SearchInputForm darkShadow={false} searchInputPlaceHolder={"Search books by price"} onInputChange={(e) => {setSearchName(e.target.value)}} onSearchClick={onSearch} /> */}
                                <div className={`light-shadow search-input-form-container`}>
                                    <select name="categories" className='search-input' id="" onChange={(e) => onSearchCategoriesName(e.target.value)}>
                                        <option value="">Select Categories</option>
                                        <option value="Mystery &amp; Suspense">Mystery & Suspense</option>
                                        <option value="Hobbies, Sports &amp; Outdoors">Hobbies, Sports & Outdoors</option>
                                        <option value="General Literature">General Literature</option>
                                        <option value="Animals, Bugs &amp; Pets">Animals, Bugs & Pets</option>
                                        <option value="Art, Creativity &amp; Music">Art, Creativity & Music</option>
                                        <option value="Science Fiction &amp; Fantasy">Science Fiction & Fantasy</option>
                                        <option value="Real Life">Real Life</option>
                                        <option value="Science &amp; Technology">Science & Technology</option>
                                    </select>

                                </div>

                            </div>
                            <div className="search-type-container">

                                <div className={`light-shadow search-input-form-container`}>
                                    <select name="book_type" className='search-input' id="" onChange={(e) => {onSearchTypeName(e.target.value)}}>
                                        <option value="fiction">Fiction</option>
                                        <option value="nonfiction">Non-Fiction</option>
                                    </select>

                                </div>

                            </div>    
                        </div>      
                        {/* </div> */}
                    </div> : null}
                </div>
            </div>


            {filterBooks && filterBooks.length && !booksLoading && !booksError && !booksFetching ?
                <ProductsListingAll books={filterBooks} /> : "NO data Availabel"}
            <Footer />
        </section>
    )
}
