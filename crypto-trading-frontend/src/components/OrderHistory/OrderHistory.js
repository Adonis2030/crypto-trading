import React from 'react';

const OrderHistory = ({ orders, onCancelOrder }) => {
  return (
    <div className='overflow-x-auto my-10'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <caption className='text-center my-5 text-xl'>Order History</caption>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className="px-6 py-3" scope="col">Pair</th>
            <th className="px-6 py-3" scope="col">Order Type</th>
            <th className="px-6 py-3" scope="col">Price</th>
            <th className="px-6 py-3" scope="col">Quantity</th>
            <th className="px-6 py-3" scope="col">Total</th>
            <th className="px-6 py-3" scope="col">Status</th>
            <th className="px-6 py-3" scope="col">Creation Date</th>
            <th className="px-6 py-3" scope="col">Completion Date</th>
            <th className="px-6 py-3" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td className="px-6 py-4 w-1/3">{order.pair}</td>
              <td className="px-6 py-4 w-1/3">{order.orderType}</td>
              <td className="px-6 py-4 w-1/3">{order.price}</td>
              <td className="px-6 py-4 w-1/3">{order.quantity}</td>
              <td className="px-6 py-4 w-1/3">{order.total}</td>
              <td className="px-6 py-4 w-1/3">{order.status}</td>
              <td className="px-6 py-4 w-1/3">{new Date(order.creationDate).toLocaleString()}</td>
              <td className="px-6 py-4 w-1/3">
                {order.completionDate
                  ? new Date(order.completionDate).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                {order.status === 'Pending' ? (
                  <button onClick={() => onCancelOrder(order.id)}>
                    Cancel
                  </button>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
