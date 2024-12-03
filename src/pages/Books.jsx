import BookList from "../components/Books/BookTable/BookList"
import style from './../styles/books.module.css';
import { useEffect, useState } from "react";
import { fetchBooks } from "../api/booksApi";
import { DataProvider } from "../context/DataContext";

const Books = () => {
    const [books, setBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const paginate = false;

    const handleUpdateBook = (updatedBook) => {
        setBooks((prevBooks) => prevBooks.map(book => (
            book.id === updatedBook.id ? updatedBook : book
        )))
    }

    useEffect( () => {

        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await fetchBooks(paginate);
               
                setBooks(response)

            } catch (error) {
                return error;
            } finally {
                setIsLoading(false);
                setError(false)
            }
        }
        getData();
        
    }, [paginate]);

    
    
    return (
        <div id={style.container}>
            <section>
            {isLoading ? (
                <p>Loading...</p> 
            ) : error ? (
                <p>{error}</p> 
            ) : (
                <DataProvider>
                    <BookList books={books} onBookUpdate={handleUpdateBook}/> 
                </DataProvider>
            )}
            </section>
        </div>
    )
}

export default Books