// import React from 'react'
// import Header from '../DesignComponent/Header'
// import Sidebar from '../DesignComponent/Sidebar'
// import PageName from '../DesignComponent/PageName'

// const Orders = () => {
//     return (
//         <>
//             <Header />
//             <Sidebar />
//             <main>
//                 <PageName pname="Orders" />

//             </main>
//         </>
//     )
// }

// export default Orders


import React, { useEffect, useState, useMemo } from 'react';
// import Header from '../DesignComponent/Header';
// import Sidebar from '../DesignComponent/Sidebar';
import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import PageName from '../assets/DesignComponent/PageName'
import { Link } from 'react-router-dom';
import axios from 'axios';
// import PageName from '../DesignComponent/PageName';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const Orders = () => {
  const api_url = 'http://localhost:3000/OrdersData';
  const [ordersData, setOrdersData] = useState([]);

  // Fetch data from API
  const getData = async () => {
    const response = await axios.get(api_url);
    setOrdersData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        header: 'S.No',
        accessorFn: (row, index) => index + 1,
      },
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Product Name',
        accessorKey: 'ProductName',
        cell: ({ row }) => (
          <Link className="productname-link" to={`/orders/view/${row.original.id}`}>
            {row.original.ProductName}
          </Link>
        ),
      },
      {
        header: 'Buyer Name',
        accessorKey: 'BuyerName',
      },
      {
        header: 'Order Date',
        accessorKey: 'OrderDate',
      },
      {
        header: 'Payment Status',
        accessorKey: 'PaymentStatus',
      },
      {
        header: 'Order Status',
        accessorKey: 'OrderStatus',
      },
      {
        header: 'Edit',
        cell: ({ row }) => (
          <Link to={`/orders/edit/${row.original.id}`}>
            <i className="fa fa-edit"></i>
          </Link>
        ),
      },
      {
        header: 'Delete',
        cell: ({ row }) => (
          <Link to={`/orders/delete/${row.original.id}`}>
            <i className="fa fa-trash"></i>
          </Link>
        ),
      },
    ],
    []
  );

  // Initialize table instance
  const table = useReactTable({
    data: ordersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Set pagination size to 5 rows per page
      },
    },
  });

  return (
    <>
      <Header />
      <Sidebar />
      <main>
        {/* Add Orders Button */}
        <div className="button-add">
          <Link to="/orders/add">
            <button className="add-btn">Add Order</button>
          </Link>
        </div>

        {/* Page Name */}
        <PageName pname="View Orders" />

        {/* Table */}
        <table className="table-products">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      padding: '10px',
                      border: '1px solid #cc00cc',
                    }}
                  >
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
                  <td
                    key={cell.id}
                    style={{
                      padding: '10px',
                      border: '1px solid #cc00cc',
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-controls">
          <button
            className="btn btn-warning"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span> </span>
          <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{' '}
            <strong>{table.getPageCount()}</strong>
          </span>
          <span> </span>
          <button
            className="btn btn-danger"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Orders;
