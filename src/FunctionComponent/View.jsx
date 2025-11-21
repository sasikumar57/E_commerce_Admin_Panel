import React, { useEffect, useState, useMemo } from 'react';
import Header from '../assets/DesignComponent/Header'
import Sidebar from '../assets/DesignComponent/Sidebar'
import PageName from '../assets/DesignComponent/PageName'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const View = () => {
  const api_url = 'https://e-commerce-admin-panel-tcs0.onrender.com/ProductsData';
  const [productData, setProductData] = useState([]);

  // Fetch data from API
  const getData = async () => {
    const response = await axios.get(api_url);
    setProductData(response.data);
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
          <Link className="productname-link" to={`/view/${row.original.id}`}>
            {row.original.ProductName}
          </Link>
        ),
      },
      {
        header: 'Product Type',
        accessorKey: 'ProductType',
      },
      {
        header: 'Manufactured By',
        accessorKey: 'ProductManufacturer',
      },
      {
        header: 'Shipped By',
        accessorKey: 'ProductShippedBy',
      },
      {
        header: 'Price (₹)',
        accessorKey: 'ProductPrice',
        cell: ({ getValue }) => `₹ ${parseFloat(getValue()).toFixed()}`,
      },
      {
        header: 'Edit',
        cell: ({ row }) => (
          <Link to={`/edit/${row.original.id}`}>
            <i className="fa fa-edit"></i>
          </Link>
        ),
      },
      {
        header: 'Delete',
        cell: ({ row }) => (
          <Link to={`/delete/${row.original.id}`}>
            <i className="fa fa-trash"></i>
          </Link>
        ),
      },
    ],
    []
  );

  // Initialize table instance
  const table = useReactTable({
    data: productData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),initialState: {
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
        <div className="button-add">
          <Link to="/add">
            <button className="add-btn">Add Product</button>
          </Link>
        </div>

        {/* Page Name */}
        <PageName pname="View Products" />

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
                      border: '1px solid #ff6600',
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
                      border: '1px solid #ff6600',
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
          <button className="btn btn-warning"
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
          <button className="btn btn-danger"
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

export default View;
