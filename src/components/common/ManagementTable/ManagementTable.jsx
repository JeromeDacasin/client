
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
    onSearch
}) => {


    if (loading) {
        return <Loader/>
    }

    return (
        <div className="management-table">
            <div className="table-options">
                <div className="search">
                    <SearchInput title={title} onChange={onSearch}/>
                </div>
                <div className="create">
                    <CreateButton title={title} onCreate={onCreate}/>
                </div>
            </div>
            
            {
                !loading &&
                data !== null &&
                <Table 
                    columns={columns} 
                    data={data}
                    onPageChange={onPageChange}
                />
          
            }
        </div>
    )
};

export default ManagementTable;