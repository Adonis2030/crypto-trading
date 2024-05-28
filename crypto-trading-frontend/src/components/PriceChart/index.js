import React from "react";
import MarketGraph from "./MarketGraph"; // Assuming TradingViewChart was also refactored
import useMarketData from "../../utils/useMarketData"; // Assuming useTradingData hook was also refactored

const PriceChart = ({ tradingPair, timeSpan }) => {
  const { marketData, dataError } = useMarketData(tradingPair, timeSpan);

  const formattedData = marketData
    .map((entry) => ({
      time: entry.timestamp / 1000,
      open: entry.openValue,
      high: entry.highestValue,
      low: entry.lowestValue,
      close: entry.closingValue,
    }))
    .sort((x, y) => x.time - y.time);

  return <MarketGraph series={formattedData} />;
};

export default PriceChart;
