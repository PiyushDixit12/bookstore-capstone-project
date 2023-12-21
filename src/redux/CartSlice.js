import {createSlice} from "@reduxjs/toolkit";


const calculateAmount = (state) => {
    return state.cartItem.reduce((prev,book) => {
        return Math.trunc((book?.canonical_isbn) / 35451731256) + prev;
    },0)
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {cartItem: [],totalAmount: 0},
    reducers: {
        setCartItems(state,action) {
            let status = false;
            state.cartItem.forEach(value => {
                if(value?.canonical_isbn == action?.payload?.canonical_isbn) {
                    console.log(" data alerady present ");
                    status = true;
                }
            });
            if(status === false) {
                state.cartItem.push(action?.payload);
            }
            state.totalAmount = calculateAmount(state);
        },
        removeCartItems(state,aciton) {
            console.log("removing arry",aciton?.payload)
            state.cartItem = aciton?.payload;
            state.totalAmount = calculateAmount(state);
        },
        // async getCartItems(state,action) {
        //     await myDataBase.collection("userCartData").onSnapshot((snapshot) => {
        //         console.log("snapshot ",snapshot)
        //         state.cartItem = snapshot.docs.fi
        //     })
        //     console.log("user id ",action.payload);
        // }
    }
});
export const {setCartItems,removeCartItems} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

