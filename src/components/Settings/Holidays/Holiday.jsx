
import { useEffect, useState } from "react";
import { fetchHolidays } from "../../../api/holidayApi";
import ManagementTable from "../../common/ManagementTable/ManagementTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoading } from "../../../hooks/useLoading";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../../../hooks/useDebounce";
import HolidayForm from "./HolidayForm/HolidayForm";


const Holiday = () => {

    const {id, action, openModal, handleOpenModal, handleCloseModal} = useModal();
    const [holidays, setHolidays] = useState(null);
    const [loading, setLoading] = useLoading();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const debounceSearch = useDebounce(search, 1000);
    const [initialLoading, setInitialLoading] = useState(true);
    let paginate = 1;

    const handleSearch = value => {
        setSearch(value);
        setPage(1);
    }

     /** @type import('@tanstack/react-table').ColumnDef<any>*/
        const columns = [
            {
                header: '#',
                accessorKey: 'id',
                cell: ({row}) => row.index + 1
            },
            {
                header: 'Holiday Name',
                accessorKey: 'name'
            },
            {
                header: 'Holiday Date',
                accessorKey: 'date'
            },
            {
                header: 'ACTION',
                cell: cell => {
                    const holidayId = cell.row.original.id
                     return (
                        <div className="actions">
                        <button className="edit" onClick={() =>  { handleOpenModal('Edit', holidayId) }} title="edit">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="show" onClick={() =>  { handleOpenModal('Show', holidayId) }} title="show">
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="trash" onClick={() => { handleOpenModal('Delete', holidayId) }}  title="delete">
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                    )
                }
            }
        ]

    useEffect(() => {
        let params = {
            page,
            paginate,
            search: debounceSearch
        }

        const getHolidays = async () => {
            try {
                setLoading(true)
                const response = await fetchHolidays(params);
                setHolidays(response)
                setInitialLoading(false)
            } catch (error) {
                return error
            } finally {
                setLoading(false)
            }
            
        }
        getHolidays();
    }, [page, paginate, debounceSearch, setLoading])

    return (
        <div>
            {
                 initialLoading && 
                 holidays === null ? 
                 (<Loader/>)  : (
                    <ManagementTable 
                            title='Holiday' 
                            data={holidays}
                            columns={columns}
                            loading={loading}
                            onPageChange={ newPage => setPage(newPage)}
                            onCreate={handleOpenModal}
                            onSearch={handleSearch}
                        />
                )
            }
            {
                openModal && (action === 'Create' || action === 'Edit' || action === 'Show') && (
                    <HolidayForm 
                        closeModal={handleCloseModal}
                        id={id}
                        action={action}
                        />
                )
            }
                
        </div>
    )
}

export default Holiday;