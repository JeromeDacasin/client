
import { useAuth } from "../../../context/AuthContext";
import Loader from "../../Loader/Loader";
import Table from "../../Table/Table";
import CreateButton from "../Button/CreateButton/CreateButton";
import SearchInput from "../Input/SearchInput/SearchInput";
import './ManagementTable.css';

const ManagementTable = ({
    title, 
    data, 
    columns, 
    loading, 
    onPageChange, 
    onCreate,
    onSearch,
    archive
}) => {
    const { user } = useAuth();

    return (
        <div className="management-table">
            <div className="table-options">
                <div className="search">
                    <SearchInput title={title} onChange={onSearch}/>
                </div>
                {['Admin', 'Librarian'].includes(user.user) && title !== 'Books or Name' && !archive &&  (
                    <div className="create">
                        <CreateButton title={title} onCreate={onCreate}/>
                    </div> 
                )}
            </div>

            <div className={`table-container ${loading ? 'loading-blur' : ''}`}>
                <Table columns={columns} data={data} onPageChange={onPageChange} />
                {loading && (
                    <div className="table-loader">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};


export default ManagementTable;