import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManagementTable from '../../components/common/ManagementTable/ManagementTable';
import { useEffect, useState } from 'react';
import { useLoading } from '../../hooks/useLoading';
import { useDebounce } from '../../hooks/useDebounce';
import useModal from '../../hooks/useModal';
import { faEdit, faEye, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons';
import './UsersPage.css';
import { deleteUser, fetchUsers } from '../../api/usersApi';
import UserForm from '../../components/Users/UserForm/UserForm';
import Loader from '../../components/Loader/Loader';
import DeleteModal from '../../components/Modal/DeleteModal/DeleteModal';
import ShowUser from '../../components/common/Button/ShowButton/ShowUser';
import HistoryTableModal from '../../components/Modal/HistoryTableModal/HistoryTableModal';
import { fetchUserHistory } from '../../api/userHistoryApi';
import { useAuth } from '../../context/AuthContext';


const UsersPage = ({roleId, title}) => {
    
    const { user } = useAuth();
    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [users, setUsers] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const debounceSearch = useDebounce(search, 1000);
    const [userCredentials, setUserCredentials] = useState('');
    const [visibleModal, setVisibleModal] = useState(false);
    const [history, setHistory] = useState(false);
    let paginate = 1;

    const handleUpdate = updatedUsers => {
        setUsers( prevData => ({
                ...prevData,
                data: prevData.data.map(user => user.id === updatedUsers.id ? updatedUsers : user)  
        }))
    }

    const handleVisibleUser = (status, user = null) => {
        setUserCredentials(user)
        setVisibleModal(status)
    }

    const handleUserHistory = async (userId) => {
         try {

            const response = await fetchUserHistory(userId, 1);
            setHistory(response);
            return response;
    
        } catch (error) {
            return error;
        }
    }

    const handleDeleteFromUI = (deletedId) => {
        setUsers(prevUsers => ({
            ...prevUsers,
            data: prevUsers.data.filter(user => user.id !== deletedId)
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
            role_id: roleId,
            search: debounceSearch
        }

        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchUsers(params);
                setUsers(response);
            } catch (error) {
                return error;
            } finally {
                setLoading(false);
            }
        }

        getData();

    }, [setLoading, paginate, page, debounceSearch, roleId]);
    
    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1 + (page - 1) * 10
        },
        ...(roleId !== 2 ? [] : [{
            header: 'STUDENT ID',
            accessorKey: 'student_number',
        }]),
        {
            header: 'LASTNAME',
            accessorKey: 'last_name'
        },
        {
            header: 'FIRSTNAME',
            accessorKey: 'first_name'
        },
       
        {
            header: 'GENDER',
            accessorKey: 'gender'
        },
        {
            header: 'EMAIL',
            accessorKey: 'email'
        },
        {
            header: 'CONTACT NUMBER',
            accessorKey: 'contact_number'
        },
        {
            header: 'ACTION',
            cell: cell => {
                const userId = cell.row.original.id
                return (
                    <div className="actions">
                        {
                            title != 'Librarian' && (
                                <button className="history" 
                                    onClick={() =>  { handleOpenModal('History', userId) 
                                            handleUserHistory(userId) 
                                        }}
                                        title="history">
                                    <FontAwesomeIcon icon={faHistory} />
                                </button>
                            )
                        }
                        {   
                            user.user === 'Admin' &&
                            <button className="edit" onClick={() =>  { handleOpenModal('Edit', userId) }} title="edit">
                              <FontAwesomeIcon icon={faEdit} />
                           </button>
                        }
                        
                        <button className="show" onClick={() =>  { handleOpenModal('Show', userId) }} title="show" >
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        {
                            user.user === 'Admin' &&
                            <button className="trash" onClick={() => { handleOpenModal('Delete', userId) }} title="delete" >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        }
                        
                    </div>
                )
            }
        }
    ]

    return (
        <div className="users-page">
            {
                initialLoading &&
                users === null ? 
                (<Loader/>) : 
                (   
                    <div> 
                        {!loading &&  <h1 className='users-title'>{title}s</h1>}
                        <ManagementTable 
                            title={title} 
                            data={users}
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
                openModal && action !== 'Delete' && action !== 'History' &&
                <UserForm
                    closeModal={() => { handleCloseModal()}}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                    title={title}
                    roleId={roleId}
                    userCredentials={handleVisibleUser}
                />
            }
            {
                openModal && action === 'Delete' && 
                (
                    <DeleteModal 
                        closeModal={handleCloseModal}
                        id={id}
                        onDelete={deleteUser}
                        onUpdate={handleDeleteFromUI}
                    />
                )
            }
            {
                openModal && action === 'History' && history &&
                (
                    <HistoryTableModal
                        closeModal={handleCloseModal}
                        id={id}
                        initialHistory={history}
                    />
                )
            }
            {
            visibleModal && (
                <ShowUser handleUser={handleVisibleUser} userCredentials={userCredentials}/>
            )}

        </div>
    )
}

export default UsersPage;