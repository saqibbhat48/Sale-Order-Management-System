import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActiveOrders } from '../api';
import AddSaleOrderModal from './AddSaleOrderModal';
import EditSaleOrderModal from './EditSaleOrderModal';

const ActiveOrders = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activeOrders'],
    queryFn: fetchActiveOrders,
  });

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (order) => {
    setEditOrder(order);
    setEditModalOpen(true);
  };

  if (isLoading) return <div className='text-center mt-4'>Loading...</div>;
  if (error) return <div>Error loading active orders</div>;

  return (
    <div className="p-4 dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Active Sale Orders</h2>
      <button
        className="mb-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleAddClick}
      >
        Add Order
      </button>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Customer ID</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">SKU ID</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Price</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Quantity</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Invoice No</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Invoice Date</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Paid</th>
            <th className="border border-gray-300 dark:border-gray-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.customer_id}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.sku_id}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.price}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.quantity}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.invoice_no}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.invoice_date}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">{order.paid ? 'Yes' : 'No'}</td>
              <td className="border border-gray-300 dark:border-gray-700 p-2">
                <button
                  className="py-1 px-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEditClick(order)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSaleOrderModal isOpen={isAddModalOpen} setIsOpen={setAddModalOpen} />
      {editOrder && (
        <EditSaleOrderModal
          isOpen={isEditModalOpen}
          setIsOpen={setEditModalOpen}
          order={editOrder}
        />
      )}
    </div>
  );
};

export default ActiveOrders;
