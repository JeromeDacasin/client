import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import './BookList.css';
import CurrencyFormat from "../../../utils/MoneyFormat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import BookModal from "../BookModal/BookModal";
import { useState } from "react";
import { useData } from "../../../context/DataContext";
import DeleteModal from "../../Modal/DeleteModal";

const BookList = ({books, onBookUpdate}) => {
    
    const [openModal, setOpenModal] = useState(false)
    const [book, setBook] = useState(null)
    const [action, setAction] = useState(null)
    const { authors, departments } = useData();

    const handleOpenModal = (type, id) => {
        setBook(id)
        setOpenModal(true)
        setAction(type)
        console.log(type);
        console.log(openModal);
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }


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
                        <button className="edit" onClick={() =>  { handleOpenModal('edit', bookId) }}>
                            <FontAwesomeIcon icon={faEdit} title="edit"/>
                        </button>
                        <button className="show" onClick={() =>  { handleOpenModal('show', bookId) }}>
                            <FontAwesomeIcon icon={faEye} title="show" />
                        </button>
                        <button className="trash" onClick={() => { handleOpenModal('delete', bookId) }}>
                            <FontAwesomeIcon icon={faTrash} title="delete" />
                        </button>

                        
                    </div>
                )
            }

        }

    ];

    const table = useReactTable({data: books, columns, getCoreRowModel: getCoreRowModel()})

    return (
        <div id="book-management">
            <div className="search-bar">
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
            </div>
            <div>
                <h3>List of Books</h3>
            </div>
            <div className="table-container">
                <div className="create">
                    <button className="btn" onClick={() => handleOpenModal('create')}>Create New Book</button>
                </div>
                <div>
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
            {openModal && action !== 'delete' && <BookModal closeModal={() => handleCloseModal()} id={book} action={action} onUpdate={onBookUpdate}/>}
            {openModal && action === 'delete' && <DeleteModal id={book} closeModal={() => handleCloseModal()}/>}
        </div>
    )
}


export default BookList;