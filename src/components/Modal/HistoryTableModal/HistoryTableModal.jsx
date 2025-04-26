import './HistoryTableModal.css';
import modalStyles from './../../../styles/Modals/modals.module.css';
import Table from '../../Table/Table';
import { useLoading } from '../../../hooks/useLoading';
import { useEffect, useState } from 'react';
import { fetchUserHistory } from '../../../api/userHistoryApi';



const HistoryTableModal = ({ closeModal, id, initialHistory }) => {

    const [loading, setLoading] = useLoading();
    const [page, setPage] = useState(1);
    const [history, setHistory] = useState(initialHistory);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetchUserHistory(id, page);
                setHistory(response);
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [page, id, setLoading]);


    const columns = [
            {
                header: '#',
                cell: ({row}) => row.index + 1 + (page - 1) * 10
            },
            {
                header: 'FULL NAME',
                accessorKey: 'user'
            },
            {
                header: 'BOOK',
                accessorKey: 'book'
            },
            {
                header: 'DATE REQUESTED',
                accessorKey: 'request_date',
                cell:  ({getValue}) => (
                    <div className='cell'>{getValue()}</div>
                )
            },
            {
                header: 'DATE BORROWED',
                accessorKey: 'borrowed_date',
                cell:  ({getValue}) => (
                    <div className='cell'>{getValue()}</div>
                )
            },
            {
                header: 'DATE RETURNED',
                accessorKey: 'returned_date',
                cell:  ({getValue}) => (
                    <div className='cell'>{getValue()}</div>
                )
            },
            {
                header: 'MUST DATE RETURNED',
                accessorKey: 'must_return_date',
                cell:  ({getValue}) => (
                    <div className='cell'>{getValue()}</div>
                )
            },
            {
                header: 'PENALTY',
                accessorKey: 'total_penalty',
                cell:  ({getValue}) => (
                    <div className='cell'>{getValue()}</div>
                )
            },
            {
                header: 'STATUS',
                accessorKey: 'status',
                cell:  ({row}) => (
                    <div className='cell'>{row.original.status.toUpperCase()}</div>
                )
                
            },
        ];
    
    return (
         <div className={modalStyles.modals}
                    onClick={ e => {
                        if(e.target.className === modalStyles.modals) closeModal()  
                    }}>
            {
                (   
                    <div className='history-table'> 
                        <Table
                            title='Books or Name' 
                            data={history}
                            columns={columns}
                            loading={loading}
                            onPageChange={setPage}
                        />
                    </div>
                )
            }
        </div>
    )
};

export default HistoryTableModal;