const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');
const axios = require('axios');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:3000' }));

let orders = [];

// RabbitMQ setup
amqp.connect('amqp://127.0.0.1', (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    const queue = 'orderQueue';
    channel.assertQueue(queue, { durable: false });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('newOrder', (order) => {
        orders.push(order);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)));
        io.emit('newOrder', order);
      });

      socket.on('cancelOrder', (orderId) => {
        const order = orders.find((o) => o.id === orderId);
        if (order && order.status === 'Pending') {
          order.status = 'Canceled';
          io.emit('orderUpdate', order);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // Consume messages from RabbitMQ
    channel.consume(
      queue,
      (msg) => {
        const order = JSON.parse(msg.content.toString());
        processOrder(order);
      },
      { noAck: true }
    );
  });
});

const processOrder = (order) => {
  // Simulate order processing
  if (order.orderType.includes('MARKET')) {
    order.status = 'Filled';
    order.completionDate = new Date();
    io.emit('orderUpdate', order);
  } else {
    // Handle limit orders
    const interval = setInterval(async () => {
      const price = await getCurrentPrice(order.pair);
      if (
        (order.orderType === 'BUY LIMIT' && price <= order.price) ||
        (order.orderType === 'SELL LIMIT' && price >= order.price)
      ) {
        order.status = 'Filled';
        order.completionDate = new Date();
        io.emit('orderUpdate', order);
        clearInterval(interval);
      }
    }, 1000);
  }
};

const getCurrentPrice = async (pair) => {
  const response = await axios.get(
    `https://api.binance.com/api/v3/ticker/price?symbol=${pair.replace(
      '/',
      ''
    )}`
  );
  return parseFloat(response.data.price);
};

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
