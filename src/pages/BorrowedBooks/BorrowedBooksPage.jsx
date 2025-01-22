import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManagementTable from '../../components/common/ManagementTable/ManagementTable';
import { useEffect, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { useDebounce } from '../../hooks/useDebounce';
import useModal from '../../hooks/useModal';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/Loader';
import { fetchBorrowedBooks } from '../../api/borrowedBooksApi';
import './BorrowedBooksPage.css';


const BorrowedBooksPage = ({roleId, status}) => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [borrowedBooks, setBorrowedBooks] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;

    const handleUpdate = updatedBorrowedBooks => {
        setBorrowedBooks( prevData => ({
                ...prevData,
                data: prevData.data.map(user => user.id === updatedBorrowedBooks.id ? updatedBorrowedBooks : user)  
        }))
    }

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
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', borrowedBookId) }}>
                        <FontAwesomeIcon icon={faEdit} title="edit"/>
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', borrowedBookId) }}>
                        <FontAwesomeIcon icon={faEye} title="show" />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', borrowedBookId) }}>
                        <FontAwesomeIcon icon={faTrash} title="delete" />
                    </button>
                </div>
                )
            }
        }
    ]

    return (
        <div className="borrow-page">
            {
                initialLoading &&
                borrowedBooks === null ? 
                (<Loader/>) : 
                (   
                    <div> 
                        <h1 className='borrow-title'>{status}</h1>
                        <ManagementTable 
                            title='status' 
                            data={borrowedBooks}
                            columns={columns}
                            loading={loading}
                            onPageChange={ newPage => setPage(newPage)}
                            onCreate={handleOpenModal}
                            onSearch={handleSearch}
                        />
                    </div>
                )
            }

            {
                // openModal &&
                // <UserForm
                //     closeModal={() => { handleCloseModal()}}
                //     action={action}
                //     id={id}
                //     onUpdate={handleUpdate}
                //     title={title}
                //     roleId={roleId}
                // />
            }
        </div>
    )
}

export default BorrowedBooksPage;