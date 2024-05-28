import { useState, useEffect } from "react";
import axios from "axios";

const useMarketData = (tradingPair, timeFrame, dataLimit = 1000) => {
  const [marketData, updateMarketData] = useState([]);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    let activeFetch = true;

    const retrieveData = async () => {
      try {
        setDataError(null);
        const result = await axios.get(
          `https://api.binance.com/api/v3/klines`,
          {
            params: {
              symbol: tradingPair,
              interval: timeFrame,
              limit: dataLimit,
            },
          }
        );
        if (activeFetch) {
          const transformedData = result.data.map((entry) => ({
            timestamp: entry[0],
            openValue: parseFloat(entry[1]),
            highestValue: parseFloat(entry[2]),
            lowestValue: parseFloat(entry[3]),
            closingValue: parseFloat(entry[4]),
            tradingVolume: parseFloat(entry[5]),
          }));
          updateMarketData(transformedData);
        }
      } catch (error) {
        if (activeFetch) {
          setDataError(error);
        }
      }
    };

    retrieveData();

    const marketDataStream = new WebSocket(
      `wss://stream.binance.com:9443/ws/${tradingPair.toLowerCase()}@kline_${timeFrame}`
    );

    const processWebSocketMessage = (event) => {
      setDataError(null);
      const data = JSON.parse(event.data);
      const { k: entry } = data;

      updateMarketData((currentData) => {
        const updatedData = [...currentData];
        const latestKline = {
          timestamp: entry.t,
          openValue: parseFloat(entry.o),
          highestValue: parseFloat(entry.h),
          lowestValue: parseFloat(entry.l),
          closingValue: parseFloat(entry.c),
          tradingVolume: parseFloat(entry.v),
        };

        if (entry.x) {
          const lastKlineIndex = updatedData.length - 1;
          if (latestKline.timestamp === updatedData[lastKlineIndex].timestamp) {
            updatedData[lastKlineIndex] = latestKline;
          } else {
            updatedData.push(latestKline);
            if (updatedData.length > dataLimit) updatedData.shift();
          }
        } else {
          updatedData[updatedData.length - 1] = latestKline;
        }
        return updatedData;
      });
    };

    marketDataStream.onmessage = processWebSocketMessage;

    marketDataStream.onerror = (event) => {
      setDataError(event);
    };

    return () => {
      marketDataStream.close();
      activeFetch = false;
    };
  }, [tradingPair, timeFrame, dataLimit]);

  return { marketData, dataError };
};

export default useMarketData;
