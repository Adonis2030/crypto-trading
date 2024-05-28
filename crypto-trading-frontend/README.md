# Crypto Trading Simulator

## Overview

This project is a simulated cryptocurrency trading platform that allows users to perform fake trades with real-time data. It supports multiple cryptocurrency pairs and provides live order book updates and trading charts. Users can place various types of orders and manage their trades within the application.

## Features

- **Live Trading Chart:** Displays live trading charts for selected cryptocurrency pairs (BTC/USDT, ETH/BTC, LTC/USDT, XRP/USDT) with selectable time frames (1min, 5min, 15min, 1h, 12h).
- **Order Book:** Real-time, updatable order book for each cryptocurrency pair.
- **Order Management:** Users can create, manage, and cancel orders.
  - Order Types: BUY LIMIT, SELL LIMIT, MARKET BUY, MARKET SELL.
  - Order Parameters: Specify price, quantity, and use balance sliders for quantity selection.
  - Order History: Displays all orders including pending, filled, and canceled orders.
- **Initial Balance:** Set initial USDT balance via UI input.

## Tech Stack

- **Frontend:** React.js
- **Real-Time Data:** WebSocket for real-time updates.
- **Backend Communication:** RabbitMQ for message queuing.
- **Caching:** Implemented caching for improved performance and reduced server load.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crypto-trading-simulator.git
   cd crypto-trading-simulator
   ```
2. Install dependencies:

   ```
    npm install
   ```

3. Start the application:
   ```
   npm start
   ```

## Usage

1. Set Initial Balance:
   Input your initial USDT balance in the provided input field.

2. Select Trading Pair:
   Choose a trading pair (BTC/USDT, ETH/BTC, LTC/USDT, XRP/USDT) from the list.

3. Create Orders:
   Select order type (BUY LIMIT, SELL LIMIT, MARKET BUY, MARKET SELL).
   Specify the price and quantity manually or use the range-slider for balance allocation.
   Submit the order. The button text will change according to the selected order type.

4. Order Management:
   View all orders in the Order History table.
   Cancel pending orders using the Cancel button (disabled if the order is filled).

5. Real-Time Updates:
   The order book and trading chart update in real-time.

## Funtionalities

- Initial Balance
  Specify User Initial Balance (USDT): Users can input their starting balance in USDT via the UI.

- Order Creation
  Order Types: BUY LIMIT - SELL LIMIT - MARKET BUY - MARKET SELL
  Specify Price: Either by input or clicking on an order line in the order book.
  Specify Quantity: Via input or using a range-slider (0%-20%-40%-60%-80%-100%).
  Submit Order: The button text reflects the selected order type.

- Order Management
  Order History: Displays all orders (including pending, filled, and canceled).
  Cancel Orders: users can cancel pending orders (disabled for filled orders).

## Technical Considerations

- Real-Time Updates: Utilizing WebSocket for real-time updates to enhance user experience and reduce server load.
- Message Queuing: RabbitMQ is used for backend communication and handling order messages.
