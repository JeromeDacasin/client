import BookList from "../components/Books/BookList"
import style from './../styles/books.module.css';
import { useEffect, useState } from "react";
import { fetchBooks } from "../api/booksApi";

const Books = () => {
    const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect( () => {

        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchBooks();
               
                setBooks(response)

            } catch (error) {
                return error;
            } finally {
                setIsLoading(false);
                setError(false)
            }
        }
        getData();
    }, []);

 
    
    return (
        <div id={style.container}>
            <section>
            {isLoading ? (
                <p>Loading...</p> 
            ) : error ? (
                <p>{error}</p> 
            ) : (
                <BookList books={books} /> 
            )}
            </section>
        </div>
    )
}

export default Books