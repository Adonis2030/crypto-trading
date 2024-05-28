import { useState, useEffect } from "react";
import axios from "axios";

const useMarketDepth = (pair, time, depth = 10) => {
  const timeFrame = {
    "1m": 60000,
    "5m": 300000,
    "15m": 1500000,
    "1h": 60000000,
    "12h": 720000000,
  };
  const [marketDepth, updateMarketDepth] = useState({
    buyOrders: [],
    sellOrders: [],
  });
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const cancelSource = axios.CancelToken.source();

    const retrieveMarketDepth = async () => {
      try {
        setFetchError(null);
        const result = await axios.get(`https://api.binance.com/api/v3/depth`, {
          params: {
            symbol: pair,
            limit: depth,
          },
          cancelToken: cancelSource.token,
        });
        updateMarketDepth({
          buyOrders: result.data.bids.sort(
            (b, a) => parseFloat(a[0]) - parseFloat(b[0])
          ),
          sellOrders: result.data.asks.sort(
            (a, b) => parseFloat(a[0]) - parseFloat(b[0])
          ),
        });
      } catch (error) {
        if (!axios.isCancel(error)) {
          setFetchError(error);
        }
      }
    };

    retrieveMarketDepth();

    const refreshInterval = setInterval(retrieveMarketDepth, timeFrame[time]);

    return () => {
      clearInterval(refreshInterval);
      cancelSource.cancel("User stopped the operation.");
    };
  }, [pair, depth, time]);

  return { marketDepth, fetchError };
};

export default useMarketDepth;
