import { useEffect, useState } from "react";
import { fetchDepartments, deleteDepartment } from "../../api/departmentsApi";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import './DepartmentPage.css';
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import DepartmentForm from "../../components/Departments/DepartmentForm/DepartmentForm";
import useModal from "../../hooks/useModal";
import { useDebounce } from "../../hooks/useDebounce";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal";



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

    const handleDeleteFromUI = (deletedId) => {
        setDepartments(prevDepartments => ({
            ...prevDepartments,
            data: prevDepartments.data.filter(department => department.id !== deletedId)
        }));
    };

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
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', departmentId) }} title="edit">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', departmentId) }} title="show" >
                        <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', departmentId) }} title="delete">
                        <FontAwesomeIcon icon={faTrash} />
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
                    <div> 
                        {!loading}
                        <h1>DEPARTMENTS</h1>
                        <ManagementTable 
                            title='Department' 
                            data={departments}
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
                <DepartmentForm 
                    closeModal={() => {handleCloseModal()}}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                />
            }
            {
                openModal && action === 'Delete' && 
                (
                    <DeleteModal 
                        closeModal={handleCloseModal}
                        id={id}
                        onDelete={deleteDepartment}
                        onUpdate={handleDeleteFromUI}
                    />
                )
            }
            
        </div>
    )
};

export default Department;