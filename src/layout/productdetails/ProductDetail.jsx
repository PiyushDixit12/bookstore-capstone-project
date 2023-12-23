import React,{useContext,useEffect,useState} from 'react'
import './ProductDetail.css'
import {useParams,NavLink} from 'react-router-dom'
import {userContext} from '../../App'
import {useDispatch,useSelector} from 'react-redux'
import {setCartItems} from '../../redux/CartSlice'
import {useGetAllBooksQuery,useGetBookByAuthorAndTitleQuery} from '../../service/bookService'
import {Loader} from '../../component/loader/Loader'
import {myDataBase} from '../../firebase/firebase'
// import {myDataBase,doc,updateDoc} from "../firebase/firebase";
import {collection,doc,getDocs,query,updateDoc,where} from "firebase/firestore";
import {SomeThingWrong} from '../../component/somethingwentWrong/SomeThingWrong'
import {NoDataFound} from '../../component/noDataFound/NoDataFound'
export const ProductDetail = () => {
    const {id: data} = useParams();

    console.log("id is ",data);
    const searchobj = JSON.parse(data);


    const user = useContext(userContext);
    const [book,setBook] = useState({});
    // const booksData = useSelector(state => {
    //     console.log("Products ===========",state);
    //     return state.books;
    // });
    // console.log(booksData);
    const {data: booksData,isLoading: bookDataLoading,isError: bookDataError} = useGetBookByAuthorAndTitleQuery(searchobj);
    const cartData = useSelector((state) => {
        return state.cart;
    })
    useEffect(() => {
        console.log("fetching data");
        // const getdata = async () => {
        //     let data = await fetchData();
        //     setBooksData(data);
        // }
        // getdata();
    },[])
    const dispatch = useDispatch();
    const updateFireStoreDoc = async (state,uid) => {
        const q = query(collection(myDataBase,"userCartData"),where("uid","==",uid));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot",querySnapshot);
        console.log("docs???",querySnapshot.docs);
        if(querySnapshot.docs.length) {
            console.log("=============================user alerady present in firebase ====================================");
            querySnapshot.docs.forEach((value) => {
                const docRef = doc(myDataBase,"userCartData",value.id);
                const data = {
                    carts: [...value.data()?.carts,book] ?? [],
                };
                updateDoc(docRef,data);
            });
        } else {
            console.log("=============================user not present in firebase ====================================");
            myDataBase.collection("userCartData").add({
                uid: uid,
                carts: [...cartData.cartItem,book],
            });
        }
        console.log("added to collection");
    }

    function handleAddToCart(event) {
        event.preventDefault();
        if(user?.accessToken) {
            dispatch(setCartItems(book));
            alert(`the book ${book.title} is added to cart`);
            updateFireStoreDoc(cartData?.cartItem,user?.uid)
        } else {
            alert("Login or don't have an account signup ");
            // navigate(path.Login.path);
        }
    }
    useEffect(() => {
        console.log(booksData);
        const book = booksData?.results?.find(value => value?.canonical_isbn == searchobj?.id);
        console.log(book);
        setBook(book);
        console.log(book);
    },[booksData]);


    return (
        <section className='detail-section-container'>
            {bookDataLoading ? <><Loader /></> : null}
            {bookDataError ? <> <SomeThingWrong /></> : null}
            {booksData?.results?.length && <div className="container">
                {/* {booksData?.results?.length && <div className="container"> */}
                <div className="flex-container">
                    <div className="book-img-container">
                        <img src={book?.published_works?.[0]?.cover_art_url} alt='book-img' width={"250px"} />
                    </div>
                    <div className="book-detail-container">
                        <h2 >{book?.title}</h2>
                        <p className=' text-primary'>{book?.authors?.[0]
                        }</p>
                        <p className='book-description'>{book?.summary} </p>
                        <p><b>language: </b>{book?.language
                        } </p>
                        <p><b>pages:</b> {book?.page_count}</p>
                        <h3> &#8377; {Math.trunc(parseInt(book?.canonical_isbn) / 35451731256)} </h3>
                        <NavLink onClick={handleAddToCart} className='button-primary'>Add To Cart </NavLink>
                    </div>
                </div>
            </div>}
            {booksData?.results?.length == 0 && <>
                <NoDataFound />
            </>}
        </section>
    )
}