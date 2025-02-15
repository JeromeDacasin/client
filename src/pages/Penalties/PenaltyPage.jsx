import { useEffect, useState } from "react";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import { fetchFines } from "../../api/penaltyApi";
import { useLoading } from "../../hooks/useLoading";
import './PenaltyPage.css';
import CurrencyFormat from "../../utils/MoneyFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import { useDebounce } from "../../hooks/useDebounce";
import Loader from "../../components/Loader/Loader";
import PenaltyForm from "../../components/Penalties/PenaltyForm/PenaltyForm";


const PenaltyPage = () => {

     const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [loading, setLoading] = useLoading();
    const [initialLoading, setInitialLoading] = useState(true);
    const [fines, setFines] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;

    const handleUpdate = updatedDepartment => {
        setFines( prevData => ({
                ...prevData,
                data: prevData.data.map(department => department.id === updatedDepartment.id ? updatedDepartment : department)  
        }))
    }

    const handleSearch = value => {
        setSearch(value)
        setPage(1)
    }

    useEffect(() => { 

        let params = {
            paginate,
            page,
            search: debounceSearch
        }

        const getData = async () => {
            try {
                setLoading(true)
                const response = await fetchFines(params)
                setFines(response)
                setInitialLoading(false)
                return response;
            } catch (error) {
                return error
            } finally {
                setLoading(false)
            }
        }
        getData();

    }, [setLoading, paginate, page, debounceSearch]);


    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1
        },
        {
            header: 'FINE',
            accessorKey: 'fine',
            cell: number => new CurrencyFormat(number).pesoSign().numberFormat().toString(),
            meta: {
                style: {
                    textAlign: 'center'
                }
            }
        },
        {
            header: 'Role',
            accessorKey: 'role'
        },
        {
            header: 'ACTION',
            cell: cell => {
                const departmentId = cell.row.original.id
                return (
                    <div className="actions">
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', departmentId) }}>
                        <FontAwesomeIcon icon={faEdit} title="edit"/>
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', departmentId) }}>
                        <FontAwesomeIcon icon={faEye} title="show" />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', departmentId) }}>
                        <FontAwesomeIcon icon={faTrash} title="delete" />
                    </button>
                </div>
                )
            }
        }
    ]


    return (
        <div className='penalty-page'>
            {
            initialLoading && 
            fines === null ? 
            (<Loader/>) :
            (
                <div>
                    <h1>FINES</h1>

                <ManagementTable
                    title='Fines'
                    data={fines}
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
                openModal &&
                <PenaltyForm
                    closeModal={ () => {handleCloseModal()}}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                />

            }
        </div>
    )
}

export default PenaltyPage;