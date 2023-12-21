import React,{useContext} from 'react'
import './CartItemCard.css'
import {useDispatch,useSelector} from 'react-redux'
import {removeCartItems} from '../../../redux/CartSlice'
import {collection,doc,getDocs,query,updateDoc,where} from 'firebase/firestore'
import {myDataBase} from '../../../firebase/firebase'
import {userContext} from '../../../App'
export const CartItemCard = ({bookData}) => {
    const {cartItem} = useSelector((state) => {
        console.log("cart item cart",state);
        return state.cart;
    });
    const user = useContext(userContext);

    const dispatch = useDispatch();

    const removeFromFireStore = async (cartData,uid) => {
        const q = query(collection(myDataBase,"userCartData"),where("uid","==",uid));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot",querySnapshot);
        console.log("docs???",querySnapshot.docs);
        if(querySnapshot.docs.length) {
            console.log("=============================user alerady present in firebase ====================================");
            querySnapshot.docs.forEach((value) => {
                const docRef = doc(myDataBase,"userCartData",value.id);
                const data = {
                    carts: cartData,
                };
                updateDoc(docRef,data);
            });
        } else {
            console.log("=============================user not present in firebase ====================================");

        }
        console.log("added to collection");
        // }

    };
    const handleRemove = () => {
        console.log(bookData.canonical_isbn);
        console.log(cartItem);
        const cartdata = cartItem.filter((book) => book.canonical_isbn !== bookData.canonical_isbn);
        dispatch(removeCartItems(cartdata));
        console.log("userid",user?.uid," cart data ",cartdata);
        removeFromFireStore(cartdata,user?.uid);
    };
    return (
        <>
            <section className="cart-item">
                <div className='cart-item-img-container'>
                    <img src={bookData?.published_works?.[0]?.cover_art_url} alt="cart-image"
                        className='cart-item-img' />
                </div>
                <div className="cart-item-content-container"
                >
                    <h3 >{bookData?.title}</h3>
                    <p>{bookData?.authors?.[0]}</p>
                    <h3 className='cart-item-price'> {Math.trunc((bookData?.canonical_isbn) / 35451731256)}</h3>
                    <button
                        className='delete-btn'
                        onClick={handleRemove}>Remove from Cart</button>
                </div>
            </section>
        </>
    )
}
