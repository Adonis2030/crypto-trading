import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';

function Chart({ pair }) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [chartSeries, setChartSeries] = useState(null);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });
    chart.current.addCandlestickSeries();
    setChartSeries(chart.current.addCandlestickSeries());

    resizeObserver.current = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.current.applyOptions({ width });
    });
    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  useEffect(() => {
    if (!chartSeries) return;

    const fetchData = async () => {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${pair.replace(
          '/',
          ''
        )}&interval=1m`
      );
      const data = response.data.map((d) => ({
        time: d[0] / 1000,
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
      }));
      chartSeries.setData(data);
    };

    fetchData();

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair
        .replace('/', '')
        .toLowerCase()}@kline_1m`
    );
    ws.onmessage = (event) => {
      const {
        k: { t, o, h, l, c },
      } = JSON.parse(event.data);
      chartSeries.update({
        time: t / 1000,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c),
      });
    };

    return () => {
      ws.close();
    };
  }, [pair, chartSeries]);

  return <div ref={chartContainerRef} />;
}

export default Chart;
