import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./../Report.css";
import { useLoading } from "../../../hooks/useLoading";
import { fetchBorrowerReport } from "../../../api/dashboardApi";
import moment from "moment";
import ManagementTable from "../../common/ManagementTable/ManagementTable";


const BorrowersReport = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useLoading();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [triggered, setTriggered] = useState(false);
  const [filters, setFilters] = useState({ from: null, to: null }); 

  const handleGenerateReport = () => {
    if (!fromDate || !toDate) {
      alert("Please select both from and to dates.");
      return;
    }
  
    const from = moment(fromDate).format("YYYY-MM-DD");
    const to = moment(toDate).format("YYYY-MM-DD");
  
    setFilters({ from, to });
    setPage(1);         
    setTriggered(true);
  };
  
  
    useEffect(() => {
      if (!triggered) return;
    
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetchBorrowerReport({
            from: filters.from,
            to: filters.to,
            page: 1, 
          });
          setData(response);
        } catch (error) {
          console.error("Error fetching report:", error);
        } finally {
          setLoading(false);
          setTriggered(false); 
        }
      };
    
      fetchData();
    }, [triggered]);
    

    useEffect(() => {
      if (!filters.from || !filters.to || page === 1) return;
    
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetchBorrowerReport({
            from: filters.from,
            to: filters.to,
            page,
          });
          setData(response);
        } catch (error) {
          console.error("Error fetching report:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [page]);

   /** @type import('@tanstack/react-table').ColumnDef<any>*/
          const columns = [
              {
                  header: '#',
                  cell: ({row}) => row.index + 1 + (page - 1) * 10
              },
              {
                  header: 'FULLNAME',
                  accessorKey: 'fullname'
              },
              {
                  header: 'TOTAL BORROWED',
                  accessorKey: 'total_borrow'
              },
              {
                header: 'TOTAL PENALTY',
                  accessorKey: 'total_penalty'
              }
          ]


  return (
    <div className="report-container">
      <h1>Borrowers</h1>
      <div className="date-filter-group">
        <div className="date-picker-wrapper">
          <label>From:</label>
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            selectsStart
            className="custom-report-picker"
            startDate={fromDate}
            endDate={toDate}
            placeholderText="Select start date"
          />
        </div>
        <div className="date-picker-wrapper">
          <label>To:</label>
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            selectsEnd
            className="custom-report-picker"
            startDate={fromDate}
            endDate={toDate}
            minDate={fromDate}
            placeholderText="Select end date"
          />
        </div>
        <div className="date-picker-wrapper">
            <label className="invi">dont</label>
        <button  onClick={handleGenerateReport} className="generate-btn">
          Generate Report
        </button>
        </div>

        {
           data.length === 0 ? 
           null : (
              <ManagementTable 
                      title='borrower' 
                      data={data}
                      columns={columns}
                      loading={loading}
                      onPageChange={ newPage => setPage(newPage)}
                 
                  />
          )
        }

      
      </div>
    </div>
  );
};

export default BorrowersReport;
