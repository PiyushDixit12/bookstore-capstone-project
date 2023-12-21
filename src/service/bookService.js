import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


// 'Animals, Bugs & Pets','Art, Creativity & Music','General Literature','Hobbies, Sports & Outdoors','Science Fiction & Fantasy','Real Life','Science & Technology','Mystery & Suspense','Reference'
export const bookStoreApi = createApi({
    reducerPath: 'bookStoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://book-finder1.p.rapidapi.com/api/`
    }),
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: ({authors,title,book_type,book_categories}) => {
                let url = "";
                if(authors?.length) {
                    url = `author=${authors}`
                    console.log("authors",url);
                } else if(title?.length) {
                    url = `title=${title}`
                    console.log("title=",url);
                } else if(book_type?.length) {
                    url = `book_type=${book_type}`
                    console.log("book_type=",url);
                } else if(book_categories?.length) {
                    url = `book_categories=${book_categories}`
                    console.log("book_categories=",url);
                }

                return {
                    url: `search?${url}&lexile_min=600&lexile_max=800&results_per_page=44&page=1`,
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '07850f7f89msh91d809952665329p14a55djsn48dec28d72d1',
                        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
                    }
                }
            }
        }),
        getBookByAuthorAndTitle: builder.query({
            query: ({author,title}) => {
                return {
                    url: `search?title=${title}&author=${author}&lexile_min=600&lexile_max=800&results_per_page=25&page=1`,
                    method: "GET",
                    headers: {
                        'X-RapidAPI-Key': '07850f7f89msh91d809952665329p14a55djsn48dec28d72d1',
                        'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
                    }
                }
            }
        })


    })

});
export const {useGetAllBooksQuery,useGetBookByAuthorAndTitleQuery} = bookStoreApi;