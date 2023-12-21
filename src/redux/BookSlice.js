import {createSlice} from '@reduxjs/toolkit'


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '07850f7f89msh91d809952665329p14a55djsn48dec28d72d1',
        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    }
};
const fetchBooks = async () => {
    const url = 'https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=25&page=1';

    try {
        const response = await fetch(url,options);
        const result = await response.json();
        console.log(result);
        return result.results;
    } catch(error) {
        console.error(error);
    }
}
const bookSlice = createSlice({
    name: "books",
    initialState: [],
    reducers: {
        addAllBooks(state,action) {
            console.log("aciton := ",action.payload)
            if(action.payload) {
                state = [...action.payload];
                console.log("=============================updated=============================")
            }
            console.log("state",state)
        },



    }
});

export const {addAllBooks} = bookSlice.actions;
export const booksReducer = bookSlice.reducer;