import './BookList.css';
import CurrencyFormat from "../../../utils/MoneyFormat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import BookModal from "../BookModal/BookModal";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Table from "../../Table/Table";


const BookList = ({books, loading, onBookUpdate, onSearchChange}) => {
    const [openModal, setOpenModal] = useState(false);
    const [book, setBook] = useState(null);
    const [action, setAction] = useState(null);
    // const { authors, departments } = useData();
    const handleOpenModal = (type, id) => {
        setBook(id)
        setOpenModal(true)
        setAction(type)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleSearchInput = e => {
        onSearchChange(e.target.value)
    }

    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1
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
            accessorKey: 'status',
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
                        <button className="edit" onClick={() =>  { handleOpenModal('Edit', bookId) }}>
                            <FontAwesomeIcon icon={faEdit} title="edit"/>
                        </button>
                        <button className="show" onClick={() =>  { handleOpenModal('Show', bookId) }}>
                            <FontAwesomeIcon icon={faEye} title="show" />
                        </button>
                        <button className="trash" onClick={() => { handleOpenModal('Delete', bookId) }}>
                            <FontAwesomeIcon icon={faTrash} title="delete" />
                        </button>
                    </div>
                )
            }

        }

    ];

    return (
        <div id="book-management">
            {/* <div className="search-bar">
                <h3>Search / Edit a Book Here</h3>
               { authors && <select name="author" id="author-select">
                    { 
                        authors.map( author => (
                            <option value={author.id} key={author.id}>{author.first_name} {author.last_name}</option>
                        ))
                    }
                </select>}


                { departments && <select name="department" id="department-select">
                    { 
                        departments.map( department => (
                            <option value={department.id} key={department.id}>{department.name}</option>
                        ))
                    }
                </select>}
            </div> */}
             

            <div className="management-table">
                <div className="books-input">
                    <div>
                        <input className="search-books" type="text" placeholder="Search..." onChange={handleSearchInput} />
                    </div>
                    <div className="create">
                        <button className="btn" onClick={() => handleOpenModal('create')}>Create New Book</button>
                    </div>
                </div>
        
                {   
                    !loading && 
                    books !== null &&           
                    <div>
                        <Table columns={columns} data={books}/>
                    </div>
                }
                
            </div>
            
            {openModal && action !== 'delete' && <BookModal closeModal={() => handleCloseModal()} id={book} action={action} onUpdate={onBookUpdate}/>}
            {openModal && action === 'delete' && <DeleteModal id={book} closeModal={() => handleCloseModal()}/>}
        </div>
    )
}


export default BookList;