import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { fetchBooks } from "../../api/booksApi";
import { showAlertError } from "../../utils/toastify";
import './BookList.css';
import { fetchAuthors } from "../../api/authorsApi";
import CurrencyFormat from "../../utils/MoneyFormat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";



const BookList = () => {
    
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {

        const getData = async () => {
            try {
                setIsLoading(true);
                const books = await fetchBooks();
                const authors = await fetchAuthors();
                setBooks(books);
                setAuthors(authors);
    
            } catch(error) {
                showAlertError(error);
            } finally {
                setIsLoading(false);
            }   
        }

        getData();
    }, []);

    // const data = useMemo( () => books, []);

    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id'
        },
        {
            header: 'NAME',
            accessorKey: 'name'
        },
        {
            header: 'AUTHOR',
            accessorKey: 'author'
        },
        {
            header: 'PRICE',
            accessorKey: 'price',
            cell: number => new CurrencyFormat(number).pesoSign().numberFormat().toString(),
            meta: {
                style: {
                    textAlign: 'center'
                }
            }
        },
        {
            header: 'EDITION',
            accessorKey: 'edition'
        },
        {
            header: 'QUANTITY',
            accessorKey: 'quantity'
        },
        {
            header: 'DEPARTMENT',
            accessorKey: 'department'
        },
        {
            header: 'STATUS',
            accessorKey: 'status'
        }, 
        {
            header: 'ACTION',
            cell: cell => {
                return (
                    <div className="actions">
                        <Link to="/" className="edit"><FontAwesomeIcon icon={faEdit} title="edit" /></Link>
                        <Link to="/" className="show"><FontAwesomeIcon icon={faEye} title="show" /></Link>
                        <Link to="/" className="trash"><FontAwesomeIcon icon={faTrash} title="delete" /></Link>
                    </div>
                )
            }

        }

    ];

    const table = useReactTable({data: books, columns, getCoreRowModel: getCoreRowModel()})

    if (isLoading) return <p>Loading...</p>;
    
    return (
        <div id="book-management">
            <div className="search-bar">
                <h3>Search / Edit a Book Here</h3>
                <select name="author" id="author-select">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                </select>
            </div>
            <div>
                <h3>List of Books</h3>
            </div>
            <div className="table-container">
                <table className="book-table">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default BookList;