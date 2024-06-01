import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ViewOrderModal from './ViewOrderModal';
import { fetchCompletedOrders } from '../api';

const CompletedOrders = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['completedOrders'],
    queryFn: fetchCompletedOrders,
  });

  const handleViewClick = (order) => {
    setViewData(order);
    setIsViewModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading completed orders</div>;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white min-h-[80dvh]">
      <h1 className="text-2xl font-bold mb-4">Completed Orders</h1>
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Customer ID</th>
            <th className="py-2 px-4 border">SKU ID</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Invoice No</th>
            <th className="py-2 px-4 border">Invoice Date</th>
            <th className="py-2 px-4 border">Paid</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-white dark:bg-gray-800">
              <td className="py-2 px-4 border">{order.customer_id}</td>
              <td className="py-2 px-4 border">{order.sku_id}</td>
              <td className="py-2 px-4 border">{order.price}</td>
              <td className="py-2 px-4 border">{order.quantity}</td>
              <td className="py-2 px-4 border">{order.invoice_no}</td>
              <td className="py-2 px-4 border">{order.invoice_date}</td>
              <td className="py-2 px-4 border">{order.paid ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleViewClick(order)}
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewData && (
        <ViewOrderModal
          isOpen={isViewModalOpen}
          setIsOpen={setIsViewModalOpen}
          order={viewData}
        />
      )}
    </div>
  );
};

export default CompletedOrders;
