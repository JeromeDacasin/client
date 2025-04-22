import  { useState, useEffect } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchMyHistories } from "../../api/borrowedBooksApi";
import './MyBooks.css';
import { faCalendarAlt, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

const MyBooksPage = () => {
    const [filter, setFilter] = useState("All");
    const [data, setData] = useState([]);
    const uniqueStatuses = ["All", ...new Set(data.map((book) => book.status))];
    const filteredBooks = filter === "All" ? data : data.filter((book) => book.status === filter);
    const today = moment().format("YYYY-MM-DD");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchMyHistories();
                setData(response.data);
            } catch (error) {
                return "Something went wrong " + error;

            }
        };

        fetchData();
    }, []);


    return (
        <div className="card-container">
            <h2>Borrowed Books</h2>
            <section className="filter-container">
                <select
                    id="status-filter"
                    className="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                    </option>
                    ))}
                </select>
                </section>
           

            <div className="card-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => {
                        const statusClass = book.status.toLowerCase().replace(/\s+/g, "-");
                        // const formattedStatus = book.status.charAt(0).toUpperCase() + book.status.slice(1).toLowerCase();
                        const isOverdue = book.status === "borrowed" && book.must_return_date < today;
                        

                        return (
                            <div key={index} className={`card ${statusClass} ${isOverdue ? "overdue" : ""}`}>
                            <h3 className="title">{book.title}</h3>

                            <p className="date-info">
                                <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Requested On:</strong>{" "}
                                {moment(book.request_date).format("MMMM D, YYYY")}
                            </p>

                            {book.status !== "requested" && (
                                <p className="date-info">
                                    <FontAwesomeIcon icon={faClock} /> <strong>Must Return By:</strong>{" "}
                                    {moment(book.must_return_date).format("MMMM D, YYYY")}
                                </p>
                            )}

                            {book.status === "returned" && (
                                <p className="date-info">
                                    <FontAwesomeIcon icon={faCheckCircle} /> <strong>Returned On:</strong>{" "}
                                    {moment(book.returned_date).format("MMMM D, YYYY")}
                                </p>
                            )}

                            <p className={`status ${statusClass} ${isOverdue ? "overdue" : ""}`}>
                                Status: <strong>{isOverdue ? "Overdue" : book.status}</strong>
                            </p>
                        </div>
                        );
                    })
                ) : (
                    <p className="no-history">No History</p>
                )}
            </div>
        </div>
    );
};


export default MyBooksPage;