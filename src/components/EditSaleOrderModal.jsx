// src/components/EditSaleOrderModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editSaleOrder } from '../api';

const EditSaleOrderModal = ({ isOpen, setIsOpen, order }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: order,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeOrders'] });
      setIsOpen(false);
      reset();
    },
    onError: (error) => {
      console.error('Error editing sale order:', error);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, id: order.id });
  };

  React.useEffect(() => {
    if (order) {
      setValue('customer_id', order.customer_id);
      setValue('sku_id', order.sku_id);
      setValue('price', order.price);
      setValue('quantity', order.quantity);
      setValue('invoice_no', order.invoice_no);
      setValue('invoice_date', order.invoice_date);
      setValue('paid', order.paid);
    }
  }, [order, setValue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit Sale Order</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Customer ID</label>
            <input
              {...register('customer_id')}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">SKU ID</label>
            <input
              {...register('sku_id')}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Price</label>
            <input
              {...register('price')}
              type="number"
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Quantity</label>
            <input
              {...register('quantity')}
              type="number"
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Invoice No</label>
            <input
              {...register('invoice_no')}
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Invoice Date</label>
            <input
              {...register('invoice_date')}
              type="date"
              className="mt-1 p-2 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Paid</label>
            <input
              {...register('paid')}
              type="checkbox"
              className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mr-2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSaleOrderModal;
