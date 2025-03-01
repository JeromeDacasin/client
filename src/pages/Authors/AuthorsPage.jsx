import { useEffect, useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import useModal from "../../hooks/useModal";
import { deleteAuthor, fetchAuthors } from "../../api/authorsApi";
import Loader from "../../components/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AuthorForm from "../../components/Authors/AuthorForm/AuthorForm";
import { useDebounce } from "../../hooks/useDebounce";
import './AuthorsPage.css';
import DeleteModal from "../../components/Modal/DeleteModal/DeleteModal";


const AuthorsPage = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [authors, setAuthors] = useState(null);
    const [loading, setLoading] = useLoading();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 1000);
    const [initialLoading, setInitialLoading] = useState(true);
    let paginate = 1;

    const handleUpdate = updatedAuthor => {
        setAuthors( prevData => ({
                ...prevData,
                data: prevData.data.map(author => author.id === updatedAuthor.id ? updatedAuthor : author)  
        }))
    }

    const handleDeleteFromUI = (deletedId) => {
        setAuthors(prevAuthors => ({
            ...prevAuthors,
            data: prevAuthors.data.filter(author => author.id !== deletedId)
        }));
    };

    const handleSearch = value => {
        setSearch(value);
        setPage(1);
    }

    useEffect( () => {

        let params = {
            page,
            paginate,
            search: debounceSearch
        }

        const getAuthors = async () => {
            try {
                setLoading(true);
                const response = await fetchAuthors(params);
                setInitialLoading(false)
                setAuthors(response);
            } catch(error) {
                return error;
            } finally {
                setLoading(false);
            }
        }

        getAuthors();

    }, [setLoading, page, paginate, debounceSearch]);

    /** @type import('@tanstack/react-table').ColumnDef<any>*/
    const columns = [
        {
            header: '#',
            accessorKey: 'id',
            cell: ({row}) => row.index + 1
        },
        {
            header: 'FIRSTNAME',
            accessorKey: 'first_name',
        },
        {
            header: 'LASTNAME',
            accessorKey: 'last_name',
        },
        {
            header: 'ACTION',
            cell: cell => {
                const authorId = cell.row.original.id
                return (
                    <div className="actions">
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', authorId) }}>
                        <FontAwesomeIcon icon={faEdit} title="edit"/>
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', authorId) }}>
                        <FontAwesomeIcon icon={faEye} title="show" />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', authorId) }}>
                        <FontAwesomeIcon icon={faTrash} title="delete" />
                    </button>
                </div>
                )
            }
        }
    ];




    return (
        <div className='authors-page'>
            
        {
            initialLoading && 
            authors === null ? 
            (<Loader/>) :
            (
                <div>
                    <h1>AUTHORS</h1>

                <ManagementTable
                    title='Authors'
                    data={authors}
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
            <AuthorForm
                closeModal={ () => {handleCloseModal()}}
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
                    onDelete={deleteAuthor}
                    onUpdate={handleDeleteFromUI}
                />
            )
        }
        </div>
    )
}

export default AuthorsPage;