import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManagementTable from '../../components/common/ManagementTable/ManagementTable';
import { useEffect, useMemo, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { useDebounce } from '../../hooks/useDebounce';
import useModal from '../../hooks/useModal';
import { faBan, faCheck, faUndo } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/Loader';
import { exportHistories, fetchBorrowedBooks } from '../../api/borrowedBooksApi';
import './BorrowedBooksPage.css';
import ConfirmationModal from '../../components/Modal/ConfirmationModal/ConfirmationModal';
import { showAlertSuccess } from '../../utils/toastify';


const BorrowedBooksPage = ({roleId, status}) => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [borrowedBooks, setBorrowedBooks] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const debounceSearch = useDebounce(search, 1000);
    const message = action === 'Return' ? 'Once confirmed, this book will be marked as returned. Do you want to proceed?' :
            `Are you sure you want to ${action} this book request ?`;
    let paginate = 1;

    const handleUpdate = (action, id) => {
    
        const filteredBooks = borrowedBooks.data.filter(book => book.id !== id);

        const updatedBooks = {
            ...borrowedBooks,  
            data: filteredBooks,  
        };

        setBorrowedBooks(updatedBooks);
    }

    const handleExport = async () => {
        try {
            setLoading(true);
            const response = await exportHistories();
    
            if (!response || !response.data) {
                throw new Error("No CSV data received from the server.");
            }
    
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
    
            
            const a = document.createElement("a");
            a.href = url;
            a.download = "history.csv";
    
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            showAlertSuccess("CSV Exported Successfully");
        } catch (error) {
            console.error("Export failed:", error);

        } finally {
            setLoading(false);
        }
    };
    

    const handleSearch = value => {
        setSearch(value);
        setPage(1);
    }

    useEffect(() => {   
        
        let params = {
            paginate,
            page,
            status: status,
            search: debounceSearch
        }

        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchBorrowedBooks(params);
                setBorrowedBooks(response);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        }

        getData();

    }, [setLoading, paginate, page, debounceSearch, status]);
    
    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1 + (page - 1) * 10
        },
        {
            header: 'FULL NAME',
            accessorKey: 'user'
        },
        {
            header: 'BOOK',
            accessorKey: 'book'
        },
        {
            header: 'DATE REQUESTED',
            accessorKey: 'request_date',
            cell:  ({getValue}) => (
                <div className='cell'>{getValue()}</div>
            )
        },
        {
            header: 'DATE BORROWED',
            accessorKey: 'borrowed_date',
            cell:  ({getValue}) => (
                <div className='cell'>{getValue()}</div>
            )
        },
        {
            header: 'DATE RETURNED',
            accessorKey: 'returned_date',
            cell:  ({getValue}) => (
                <div className='cell'>{getValue()}</div>
            )
        },
        {
            header: 'MUST DATE RETURNED',
            accessorKey: 'must_return_date',
            cell:  ({getValue}) => (
                <div className='cell'>{getValue()}</div>
            )
        },
        {
            header: 'PENALTY',
            accessorKey: 'total_penalty',
            cell:  ({getValue}) => (
                <div className='cell'>{getValue()}</div>
            )
        },
        {
            header: 'STATUS',
            accessorKey: 'status',
            cell:  ({row}) => (
                <div className='cell'>{row.original.status.toUpperCase()}</div>
            )
            
        },
        {
            header: 'ACTION',
            cell: cell => {
                const borrowedBookId = cell.row.original.id
                return (

                    <div className="actions">
                    {
                        status === 'requested' && (
                            <button className="approve" onClick={() =>  { handleOpenModal('Approve', borrowedBookId) }} title="approve">
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                        )
                    }

                    {
                        status === 'borrowed' && (
                            <button className="return" onClick={() =>  { handleOpenModal('Return', borrowedBookId) }} title="return">
                                <FontAwesomeIcon icon={faUndo} />
                            </button>
                        )
                    }

                    {/* <button className="eye" onClick={() =>  { handleOpenModal('Show', borrowedBookId) }}>
                        <FontAwesomeIcon  icon={faEye} title="show" />
                    </button> */}

                    {   status === 'requested' && (
                            <button className="ban" onClick={() =>  { handleOpenModal('Deny', borrowedBookId) }} title="deny" >
                                <FontAwesomeIcon  icon={faBan} />
                            </button>
                        )
                    }
                </div>
                )
            }
        }
    ]

    const filteredColumns = useMemo(() => {
        switch (status) {
            case 'requested':
                return columns.filter(col => !['borrowed_date', 'returned_date', 'total_penalty', 'status', 'must_return_date'].includes(col.accessorKey));
            
            case 'borrowed':
                return columns.filter(col => !['returned_date', 'total_penalty', 'status'].includes(col.accessorKey));
    
            case 'returned': 
                return columns.filter(col => col.header !== 'ACTION');
            default: 
                return columns;
        }
    }, [status]);

     

    return (
        <div className="borrow-page">
            {
                initialLoading &&
                borrowedBooks === null ? 
                (<Loader/>) : 
                (   
                    <div> 
                        { !loading && <h1 className='borrow-title'>{status}</h1>}
                        <ManagementTable 
                            title='Books or Name' 
                            data={borrowedBooks}
                            columns={filteredColumns}
                            loading={loading}
                            onPageChange={ newPage => setPage(newPage)}
                            onCreate={handleOpenModal}
                            onSearch={handleSearch}
                            status={status}
                            onExport={handleExport}
                        />
                    </div>
                )
            }
    
            {
                openModal &&
                <ConfirmationModal
                    closeModal={() => { handleCloseModal()}}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                    message={message}
                />
            }
        </div>
    )
}

export default BorrowedBooksPage;