// api.js

let activeOrders = [
    {
      id: 1,
      customer_id: '1',
      sku_id: '2',
      price: '100',
      quantity: '10',
      invoice_no: '12345',
      invoice_date: '2022-12-01',
      paid: true,
    },
    {
      id: 2,
      customer_id: '3',
      sku_id: '4',
      price: '200',
      quantity: '20',
      invoice_no: '12346',
      invoice_date: '2022-12-02',
      paid: false,
    },
  ];
  
  export const fetchActiveOrders = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...activeOrders]);
      }, 1000);
    });
  };
  
  export const addSaleOrder = async (newOrder) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = activeOrders.length + 1;
        const orderWithId = { id, ...newOrder };
        activeOrders.push(orderWithId);
        resolve(orderWithId);
      }, 1000);
    });
  };
  
  export const editSaleOrder = async (updatedOrder) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        activeOrders = activeOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
        resolve(updatedOrder);
      }, 1000);
    });
  };
  
  
  export const fetchCompletedOrders = async () => {
    return [
      {
        id: 1,
        customer_id: '15',
        sku_id: '25',
        price: 700,
        quantity: 2,
        invoice_no: '33332',
        invoice_date: '2023-01-02',
        paid: true,
      },
      // Add more orders as needed
    ];
  };
  
  