import React, { useState } from 'react';

function OrderForm({ pair, balance, onNewOrder }) {
  const [orderType, setOrderType] = useState('BUY LIMIT');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const clearValue = () => {
    setOrderType('BUY LIMIT');
    setPrice('');
    setQuantity('');
  };

  const handleSubmit = () => {
    const order = {
      id: Date.now(),
      pair,
      orderType,
      price,
      quantity,
      total: price * quantity,
      status: 'Pending',
      creationDate: new Date(),
      completionDate: null,
    };
    onNewOrder(order);
    clearValue();
  };

  return (
    <div className='mt-5'>
      <h2 className=' text-3xl text-slate-300'>New Order</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='mt-3'>
          <label className=' text-base text-slate-300'>Order Type:</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className='px-5 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
          >
            <option value='BUY LIMIT'>BUY LIMIT</option>
            <option value='SELL LIMIT'>SELL LIMIT</option>
            <option value='MARKET BUY'>MARKET BUY</option>
            <option value='MARKET SELL'>MARKET SELL</option>
          </select>
        </div>
        <div className='mt-3'>
          <label className=' text-base text-slate-300'>Price:</label>
          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='px-5 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
          />
        </div>
        <div className='mt-3'>
          <label className=' text-base text-slate-300'>Quantity:</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='px-5 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
          />
        </div>
        <button
          type='submit'
          onClick={handleSubmit}
          disabled={balance < price * quantity}
          className='mt-5 px-5 text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer'
        >
          {orderType}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
