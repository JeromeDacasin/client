import BookList from "../../components/Books/BookTable/BookList"
import './books.css';
import { useEffect, useState } from "react";
import { fetchBooks } from "../../api/booksApi";
import { DataProvider } from "../../context/DataContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";

const Books = () => {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);

    const handleUpdateBook = (updatedBook) => {
        setBooks(prevBooks => ({
            ...prevBooks,
            data: prevBooks.data.map(book => book.id === updatedBook.id ? updatedBook : book)
        }))
    }

    const handleSearch = (value) => {
        setSearch(value);
    }

    useEffect( () => {

        let payload = {
            search: debounceSearch
        }
        
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchBooks(payload);
                setBooks(response)
                setInitialLoading(false);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        }
        getData();
        
    }, [debounceSearch, setLoading]);
    
    return (
        <div className='books-page'>
            {
                initialLoading && books === null ? 
                    (<Loader/>) :
                    (
                        <DataProvider>
                            <BookList 
                                books={books} 
                                onBookUpdate={handleUpdateBook} 
                                onSearchChange={handleSearch}
                                loading={loading}
                            /> 
                        </DataProvider>
                    )
            }
            
        </div>
    )
}

export default Books