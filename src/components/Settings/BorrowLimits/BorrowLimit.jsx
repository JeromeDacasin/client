
import { useEffect, useState } from "react";
import ManagementTable from "../../common/ManagementTable/ManagementTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoading } from "../../../hooks/useLoading";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../../../hooks/useDebounce";
import { fetchBorrowLimits } from "../../../api/borrowLimitApi";
import BorrowLimitForm from "./BorrowLimitForm/BorrowLimitForm";



const BorrowLimit = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [borrowLimit, setBorrowLimit] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;


    const handleUpdate = updatedBorrowLimit => {
        setBorrowLimit( prevData => ({
                ...prevData,
                data: prevData.data.map(borrowLimit => borrowLimit.id === updatedBorrowLimit.id ? updatedBorrowLimit : borrowLimit)  
        }))
    }

    const handleDeleteFromUI = (deletedId) => {
        setBorrowLimit(prevBorrowLimit => ({
            ...prevBorrowLimit,
            data: prevBorrowLimit.data.filter(borrowLimit => borrowLimit.id !== deletedId)
        }));
    };

    const handleSearch = value => {
        setSearch(value);
        setPage(1);
    }

    useEffect(() => {
        
        let params = {
            paginate,
            page,
            search: debounceSearch
        }
        
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchBorrowLimits(params);
                setBorrowLimit(response);
                setInitialLoading(false);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        }

        getData();

    }, [setLoading, paginate, page, debounceSearch]);
    
    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1 + (page - 1) * 10
        },
        {
            header: 'Max Borrowable Books ',
            accessorKey: 'number'
        },
        {
            header: 'Role',
            accessorKey: 'role'
        },
        {
            header: 'ACTION',
            cell: cell => {
                const borrowLimitId = cell.row.original.id
                return (
                    <div className="actions">
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', borrowLimitId) }} title="edit">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', borrowLimitId) }} title="show">
                        <FontAwesomeIcon icon={faEye}  />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', borrowLimitId) }} title="delete" >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                )
            }
        }
    ]

    return (
        <div className="borrowLimit-page">
            {
                initialLoading && 
                borrowLimit === null ? 
                (<Loader/>) :
                (
                    <div>
                       {!loading && <h1>Borrow Limit</h1>}

                    <ManagementTable
                        title='BorrowLimit'
                        data={borrowLimit}
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
                openModal && action !== 'Delete' &&
                <BorrowLimitForm
                    closeModal={() => handleCloseModal()}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                />
            }
             {/* {
                openModal && action === 'Delete' && 
                (
                    <DeleteModal 
                        closeModal={handleCloseModal}
                        id={id}
                        onDelete={deleteBorrowLimit}
                        onUpdate={handleDeleteFromUI}
                    />
                )
            }  */}
        </div>
    )
}

export default BorrowLimit;



