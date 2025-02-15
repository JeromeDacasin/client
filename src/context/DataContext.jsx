import { createContext, useContext, useEffect, useState } from "react";
import { fetchAuthors } from "../api/authorsApi";
import { fetchDepartments } from "../api/departmentsApi";
import { fetchPublishers } from "../api/publisherApi";


const DataContext = createContext();

export const DataProvider = ( {children} ) => {
    const [authors, setAuthors] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [publishers, setPublishers] = useState(null);
    
    useEffect(() => {
        const paginate = false;
        const fetchDatas = async () => {
            try {
                
                const authorsData = await fetchAuthors(paginate);
                const departmentsData = await fetchDepartments(paginate);
                const publishersData = await fetchPublishers(paginate);
                setAuthors(authorsData);
                setDepartments(departmentsData);
                setPublishers(publishersData);
                
            } catch (error) {
                return error;
            }
        }
        
        fetchDatas();
    }, []);
    
    return (
        <DataContext.Provider value={{authors, departments, publishers}}>
            {children}
        </DataContext.Provider>
    )
    
}


export const useData = () => useContext(DataContext);