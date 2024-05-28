import React, { useEffect, useState } from 'react';

function OrderBook({ pair }) {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@depth`
    );
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOrderBook({ bids: data.b, asks: data.a });
    };

    return () => ws.close();
  }, [pair]);

  return (
    <div className='px-20 text-center rtl:text-right text-gray-500 dark:text-gray-400 text-sm h-screen overflow-y-auto'>
      <h2 className='text-center my-5 text-xl'>{pair} Order Book</h2>
      <div>
        <h3 className='text-2x1'>Bids</h3>
        <ul>
          {orderBook.bids.map((bid, index) => (
            <li key={index}>
              {bid[0]} - {bid[1]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Asks</h3>
        <ul>
          {orderBook.asks.map((ask, index) => (
            <li key={index}>
              {ask[0]} - {ask[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderBook;
