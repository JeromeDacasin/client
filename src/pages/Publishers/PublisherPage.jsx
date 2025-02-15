import { useEffect, useState } from "react";
import ManagementTable from "../../components/common/ManagementTable/ManagementTable";
import { useLoading } from "../../hooks/useLoading";
import { useDebounce } from "../../hooks/useDebounce";
import { fetchPublishers } from "../../api/publisherApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import './PublisherPage.css';
import PublisherForm from "../../components/Publishers/PublisherForm/PublisherForm";
import Loader from "../../components/Loader/Loader";

const PublisherPage = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [publishers, setPublishers] = useState(null);
    const [loading, setLoading] = useLoading();
    const [search, setSearch] = useState(null);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const debounceSearch = useDebounce(search, 1000);
    let paginate = 1;


    const handleUpdate = updatedPublisher => {
        setPublishers( prevData => ({
                ...prevData,
                data: prevData.data.map(publisher => publisher.id === updatedPublisher.id ? updatedPublisher : publisher)  
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
            search: debounceSearch
        }
        
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchPublishers(params);
                setPublishers(response);
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
                const publisherId = cell.row.original.id
                return (
                    <div className="actions">
                    <button className="edit" onClick={() =>  { handleOpenModal('Edit', publisherId) }}>
                        <FontAwesomeIcon icon={faEdit} title="edit"/>
                    </button>
                    <button className="show" onClick={() =>  { handleOpenModal('Show', publisherId) }}>
                        <FontAwesomeIcon icon={faEye} title="show" />
                    </button>
                    <button className="trash" onClick={() => { handleOpenModal('Delete', publisherId) }}>
                        <FontAwesomeIcon icon={faTrash} title="delete" />
                    </button>
                </div>
                )
            }
        }
    ]

    return (
        <div className="publishers-page">
            {
                initialLoading && 
                publishers === null ? 
                (<Loader/>) :
                (
                    <div>
                        <h1>PUBLISHERS</h1>

                    <ManagementTable
                        title='Publishers'
                        data={publishers}
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
                <PublisherForm
                    closeModal={() => handleCloseModal()}
                    action={action}
                    id={id}
                    onUpdate={handleUpdate}
                />
            }
        </div>
    )
}

export default PublisherPage;



