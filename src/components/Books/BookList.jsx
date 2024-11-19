import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import './BookList.css';
import CurrencyFormat from "../../utils/MoneyFormat";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import BookModal from "./BookModal";
import { useState } from "react";

const BookList = ({books}) => {
    
    const [openModal, setOpenModal] = useState(false)
    const [book, setBook] = useState(null)
    const [action, setAction] = useState(null)

    const handleOpenModal = (type, id) => {
        setBook(id)
        setOpenModal(true)
        setAction(type)
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
                    <span className={`status-icon ${status === 'Yes' ? 'yes' : 'no'}`}>
                        {
                            status.toLowerCase() === 'yes' ? (
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
                        <button to="/" className="trash"><FontAwesomeIcon icon={faTrash} title="delete" /></button>
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
            {openModal && <BookModal closeModal={() => handleCloseModal()} id={book} action={action}/>}
        </div>
    )
}


export default BookList;