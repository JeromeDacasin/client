import { useEffect, useState } from "react";
import { fetchDepartments } from "../../api/departmentsApi";
import { useLoading } from "../../hooks/useLoading";
import Loader from "../../components/Loader/Loader";
import DepartmentList from "../../components/Departments/DepartmentList/DepartmentList";
import './department.css';



const Department = () => {

    const [loading, setLoading] = useLoading();
    const [initialLoading, setInitialLoading] = useState(true);
    const [departments, setDepartments] = useState(null);
    let paginate = 1;


    useEffect(() => {

        let params = {
            paginate,
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

    }, [setLoading, paginate])

    return (
        <div className="department-page">
            {
                initialLoading &&
                departments === null ? 
                (<Loader/>) : 
                (
                    <DepartmentList 
                        departments={departments}
                        loading={loading}
                    />
                )
            }
        </div>
    )
};

export default Department;