import { useEffect, useState } from "react";
import { fetchDepartments } from "../../api/departmentsApi";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import './department.css';
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import DepartmentForm from "../../components/Departments/DepartmentForm/DepartmentForm";
import useModal from "../../hooks/useModal";
import { useDebounce } from "../../hooks/useDebounce";



const Department = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [loading, setLoading] = useLoading();
    const [initialLoading, setInitialLoading] = useState(true);
    const [departments, setDepartments] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;

    const handleUpdate = updatedDepartment => {
        setDepartments( prevData => ({
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
                const response = await fetchDepartments(params);
                setDepartments(response)
                setInitialLoading(false)
                return response;
            } catch (error) {
                return error
            } finally {
                setLoading(false)
            }
        }
        getData();

    }, [setLoading, paginate, page, debounceSearch])


    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1
        },
        {
            header: 'NAME',
            accessorKey: 'name'
        },
        {
            header: 'DESCRIPTION',
            accessorKey: 'description'
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
        <div className="department-page">
            {
                initialLoading &&
                departments === null ? 
                (<Loader/>) : 
                (
                    <ManagementTable 
                        title='Department' 
                        data={departments}
                        columns={columns}
                        loading={loading}
                        onPageChange={ newPage => setPage(newPage)}
                        onCreate={handleOpenModal}
                        onSearch={handleSearch}
                    />
                )
            }
            {
                openModal && 
                <DepartmentForm 
                    closeModal={() => {handleCloseModal()}}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                />
            }
        </div>
    )
};

export default Department;