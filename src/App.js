
import {createContext,useEffect,useState} from 'react';
import {RouteBookStore} from './routes/RouteBookStore';
import {auth,myDataBase} from './firebase/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {ScrollToTop} from './utils/ScrollToTop';
import {Loader} from './component/loader/Loader';
import {useDispatch} from 'react-redux';
import {setCartItems} from './redux/CartSlice';
import {collection,query,where,getDocs} from 'firebase/firestore';
// import {Modal} from './component/modal/Modal';

export const userContext = createContext({});
function App() {
  const dispatch = useDispatch();
  const [userAuth,setUserAuth] = useState(null);
  const storeCarts = async (user) => {
    console.log("user id is",user?.uid);
    const q = query(collection(myDataBase,"userCartData"),where("uid","==",user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((value) => {
      value.data()?.carts.map((value,index) => {
        dispatch(setCartItems(value));
      });
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      console.log("user",user)
      if(user) {
        setUserAuth(user);
        storeCarts(user);
      } else {
        console.log("userNot present");
        setUserAuth({})
      }
    });
  },[]);


  return (
    <ScrollToTop>
      <userContext.Provider value={userAuth} >
        {userAuth ?
          <RouteBookStore /> : <div className=' flex justify-center ' style={{height: "100vh",width: "100%",alignItems: "center"}}><Loader /></div>}
        {/* <Modal /> */}

      </userContext.Provider>
    </ScrollToTop>
  );
}

export default App;
