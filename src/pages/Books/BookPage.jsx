import './books.css';
import { useEffect, useState } from "react";
import { archiveBook, fetchBooks, retrieveBook } from "../../api/booksApi";
import { useDebounce } from "../../hooks/useDebounce";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faExchangeAlt, faEye, faFileArrowUp, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../hooks/useModal';
import CurrencyFormat from '../../utils/MoneyFormat';
import BookForm from '../../components/Books/BookForm/BookForm';
import { DataProvider } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import RetrieveModal from '../../components/Modal/RetrieveModal/RetrieveModal';
import ImportModal from '../../components/Modal/ImportModal/ImportModal';

const BookPage = () => {

    const { user } = useAuth();
    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);
    const [page, setPage] = useState(1);
    const [isArchive, setIsArchive] = useState(false);
    const isLibrarianOrAdmin = ['Librarian', 'Admin'].includes(user.user);
    const message = 'Do you want to borrow this book ?'; 

    const handleUpdateBook = (updatedBook) => {
        setBooks(prevBooks => ({
            ...prevBooks,
            data: prevBooks.data.map(book => book.id === updatedBook.id ? updatedBook : book)
        }))
    };

    const handleDeleteFromUI = (deletedId) => {
        setBooks(prevBooks => ({
            ...prevBooks,
            data: prevBooks.data.filter(book => book.id !== deletedId) 
        }));
    };

    const handleSearch = (value) => {
        setSearch(value);
    }

     /** @type import('@tanstack/react-table').ColumnDef<any>*/
     const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1 + (page - 1) * 10
        },
        ...(!isArchive ? [] : [{
            header: 'REASON',
            accessorKey: 'reason',
        }]),
        {
            header: 'ACQUISITION ID',
            accessorKey: 'acquisition_id',
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
                            !isArchive &&
                            <button title="request" className="edit" onClick={() =>  { handleOpenModal('Request', bookId) }}>
                              <FontAwesomeIcon icon={faExchangeAlt}/>
                          </button>
                        }
                      
                        {
                            isLibrarianOrAdmin && !isArchive ? 
                            (
                                <>
                                    <button title="edit" className="edit" onClick={() =>  { handleOpenModal('Edit', bookId) }}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button title="show"  className="show" onClick={() =>  { handleOpenModal('Show', bookId) }}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button title="archive" className="trash" onClick={() => { handleOpenModal('Delete', bookId) }}>
                                        <FontAwesomeIcon icon={faTrash}  />
                                    </button>
                                </>
                            ) : !isLibrarianOrAdmin ? 
                            (
                                <></>
                            ) : null
                        }   
                        {
                            isLibrarianOrAdmin && isArchive &&
                            <button title="Retrieve" className="retreive" onClick={() =>  { handleOpenModal('Retrieve', bookId) }}>
                            <FontAwesomeIcon icon={faFileArrowUp}/>
                        </button>
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
            search: debounceSearch,
            isArchive,
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
        
    }, [page, debounceSearch, setLoading, isArchive]);
    
    return (
        <div className="books-page">
            <DataProvider>
            {
                
                initialLoading &&
                books === null ? 
                (<Loader/>) : 
                (   
                    
                    <div> 
                         {<h1>{isArchive ? 'Archived Books' : 'Books'}</h1>}
                        { 
                            isLibrarianOrAdmin && (
                                <div className="tabs">
                                    <button 
                                        className={!isArchive ? 'active' : ''} 
                                        onClick={() => setIsArchive(false)}
                                    >
                                        Books
                                    </button>
                                    <button 
                                        className={isArchive ? 'active' : ''} 
                                        onClick={() => setIsArchive(true)}
                                    >
                                        Archive
                                    </button>
                                </div>
                            )
                        }
                        <ManagementTable 
                            title='Books'
                            data={books}
                            columns={filteredColumns}
                            loading={loading}
                            onPageChange={ newPage => setPage(newPage)}
                            onCreate={handleOpenModal}
                            onSearch={handleSearch}
                            archive={isArchive} 
                        />
                        
                    </div>
                )
            }
            {openModal && (action === 'Create' || action === 'Edit' || action === 'Show' ) && ['Librarian', 'Admin'].includes(user.user) && 
                (
                    <BookForm 
                        closeModal={handleCloseModal}
                        action={action}
                        id={id}
                        onUpdate={handleUpdateBook}
                    />
                )
            }
            {
                openModal && action === 'Import' && (
                    <ImportModal closeModal={handleCloseModal}/>
                )
            }
            {
                openModal && action === 'Request' && (
                    <ConfirmationModal 
                        closeModal={handleCloseModal}
                        action={action}
                        id={id}
                        onUpdate={handleUpdateBook}
                        message={message}
                    />
                )
            }
            {
                openModal && ['Librarian', 'Admin'].includes(user.user) 
                && action === 'Delete' && 
                (
                    <DeleteModal
                        closeModal={handleCloseModal}
                        id={id}
                        onDelete={archiveBook}
                        onUpdate={handleDeleteFromUI}
                        action={action}
                    />
                )
            }
            {
                openModal && ['Librarian', 'Admin'].includes(user.user) 
                && action === 'Retrieve' && 
                (
                    <RetrieveModal 
                        closeModal={handleCloseModal}
                        id={id}
                        onRetrieve={retrieveBook}
                        onUpdate={handleDeleteFromUI}
                    />
                )
            }
            </DataProvider>
        </div>
    )
}

export default BookPage