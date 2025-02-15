import './books.css';
import { useEffect, useMemo, useState } from "react";
import { fetchBooks } from "../../api/booksApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faExchangeAlt, faEye, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../hooks/useModal';
import CurrencyFormat from '../../utils/MoneyFormat';
import BookForm from '../../components/Books/BookForm/BookForm';
import { DataProvider } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal';

const BookPage = () => {

    const { user } = useAuth();
    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);
    const [page, setPage] = useState(1);
    const message = 'Do you want to borrow this book ?'; 

    const handleUpdateBook = (updatedBook) => {
        setBooks(prevBooks => ({
            ...prevBooks,
            data: prevBooks.data.map(book => book.id === updatedBook.id ? updatedBook : book)
        }))
    };

    const handleSearch = (value) => {
        setSearch(value);
    }

     /** @type import('@tanstack/react-table').ColumnDef<any>*/
     const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1
        },
        {
            header: 'TITLE',
            accessorKey: 'title'
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
            accessorKey: 'total_quantity'
        },
        {
            header: 'REMAINING',
            accessorKey: 'remaining'
        },
        {
            header: 'DEPARTMENT',
            accessorKey: 'department'
        },
        {
            header: 'STATUS',
            accessorKey: 'is_active',
            cell: ({ getValue }) => {
                const status = getValue();
                return (
                    <span className={`status-icon ${status == 1 ? 'yes' : 'no'}`}>
                        {
                            status == 1 ? (
                                <FontAwesomeIcon icon={faCheckCircle}/>
                            ) : (
                                <FontAwesomeIcon icon={faXmarkCircle}/>
                            )
                        }
                    </span>
                )
            }
        }, 
        {
            header: 'ACTION',
            cell: cell => {
                const bookId = cell.row.original.id;
                return (
                    <div className="actions">
                        {
                            ['Librarian', 'Admin'].includes(user.user) ?
                            (
                                <>
                                <button className="edit" onClick={() =>  { handleOpenModal('Edit', bookId) }}>
                                <FontAwesomeIcon icon={faEdit} title="edit"/>
                                </button>
                                <button className="show" onClick={() =>  { handleOpenModal('Show', bookId) }}>
                                <FontAwesomeIcon icon={faEye} title="show" />
                                </button>
                                <button className="trash" onClick={() => { handleOpenModal('Delete', bookId) }}>
                                <FontAwesomeIcon icon={faTrash} title="delete" />
                                </button>
                                </>
                            ) : 
                            (
                                <button className="edit" onClick={() =>  { handleOpenModal('Request', bookId) }}>
                                    <FontAwesomeIcon icon={faExchangeAlt} title="edit"/>
                                </button>
                            )
                        }
                        
                        
                        
                    </div>
                )
            }

        }

    ];


     const filteredColumns = columns.filter(col => {
        switch (user.user) {
            case 'Librarian':
            case 'Admin': 
                return !['test'].includes(col.accessorKey);
            default:
                return !['status'].includes(col.accessorKey);
        }
     })

    useEffect( () => {

        let payload = {
            page,
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
        
    }, [page, debounceSearch, setLoading]);
    
    return (
        <div className="books-page">
            <DataProvider>
            {
                initialLoading &&
                books === null ? 
                (<Loader/>) : 
                (   
                    <div> 
                        {!loading && <h1>Books</h1>}
                        <ManagementTable 
                            title='Books' 
                            data={books}
                            columns={filteredColumns}
                            loading={loading}
                            onPageChange={ newPage => setPage(newPage)}
                            onCreate={handleOpenModal}
                            onSearch={handleSearch}
                        />
                    </div>
                )
            }
            {openModal && (
                ['Librarian', 'Admin'].includes(user.user) ? (
                    <BookForm 
                        closeModal={handleCloseModal}
                        action={action}
                        id={id}
                        onUpdate={handleUpdateBook}
                    />
                ) : (
                    <ConfirmationModal 
                        closeModal={handleCloseModal}
                        action={action}
                        id={id}
                        onUpdate={handleUpdateBook}
                        message={message}
                    />
                )
            )}
            </DataProvider>
        </div>
    )
}

export default BookPage