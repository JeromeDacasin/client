import { useEffect, useState } from "react";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import { useLoading } from "../../hooks/useLoading";
import { useDebounce } from "../../hooks/useDebounce";
import { deleteRole, fetchRoles } from "../../api/roleApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import Loader from "../../components/Loader/Loader";
import './RolePage.css';
import RoleForm from "../../components/Roles/RoleForm/RoleForm";
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal";

const RolePage = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [roles, setRoles] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;


    const handleUpdate = updatedRole => {
        setRoles( prevData => ({
                ...prevData,
                data: prevData.data.map(role => role.id === updatedRole.id ? updatedRole : role)  
        }))
    }

    const handleDeleteFromUI = (deletedId) => {
        setRoles(prevRoles => ({
            ...prevRoles,
            data: prevRoles.data.filter(role => role.id !== deletedId)
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
                const response = await fetchRoles(params);
                setRoles(response);
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
                const roleId = cell.row.original.id
                return (
                    <div className="actions">
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', roleId) }}>
                        <FontAwesomeIcon icon={faEdit} title="edit"/>
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', roleId) }}>
                        <FontAwesomeIcon icon={faEye} title="show" />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', roleId) }}>
                        <FontAwesomeIcon icon={faTrash} title="delete" />
                    </button>
                </div>
                )
            }
        }
    ]

    return (
        <div className="roles-page">
            {
                initialLoading && 
                roles === null ? 
                (<Loader/>) :
                (
                    <div>
                       {!loading && <h1>ROLES</h1>}

                    <ManagementTable
                        title='Roles'
                        data={roles}
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
                <RoleForm
                    closeModal={() => handleCloseModal()}
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
                        onDelete={deleteRole}
                        onUpdate={handleDeleteFromUI}
                    />
                )
            }
        </div>
    )
}

export default RolePage;



