import axios from "axios";
import { useState, useEffect } from "react";


const BookList = () => {

    const [books, setBooks] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:8000/api/v1/books')
            .then( response => {
                setBooks(response.data.data)
            })
    }, []);

    return (<div>
         <ul>
            {books.map( book => (
                <li key={book.id}> {book.name} </li>
            ))}
            
        </ul>
    </div>)
}


export default BookList;