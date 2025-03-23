import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import './Table.css';

const Table = ({columns, data, onPageChange}) => {

    const table = useReactTable({
        data: data.data,
        columns,
        pageCount: data.meta.last_page,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    });

    return (
        <div className="sample">
             <table className="table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="btn btn-first"
                    onClick={() => onPageChange(1)}
                    disabled={data.meta.current_page === 1}
                >
                    First
                </button>
                <button
                    className="btn btn-mid"
                    onClick={() => onPageChange(data.meta.current_page - 1)}
                    disabled={!data.links.prev}
                >
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {data.meta.current_page} of {data.meta.last_page}
                    </strong>
                </span>
                <button
                    className="btn btn-mid"
                    onClick={() => onPageChange(data.meta.current_page + 1)}
                    disabled={!data.links.next}
                >
                    Next
                </button>
                <button
                    className="btn btn-last"
                    onClick={() => onPageChange(data.meta.last_page)}
                    disabled={data.meta.current_page === data.meta.last_page}
                >
                    Last
                </button>
            </div>

        </div>
       
    )
}

export default Table;


