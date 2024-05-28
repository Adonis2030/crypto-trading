import React, { useRef, useEffect } from "react";
import {
  createChart,
  CrosshairMode,
  LineStyle,
  TickMarkType,
} from "lightweight-charts";

const MarketGraph = ({ series }) => {
  const graphContainerRef = useRef();
  const graphInstance = useRef();

  useEffect(() => {
    graphInstance.current = createChart(graphContainerRef.current, {
      width: graphContainerRef.current.offsetWidth,
      height: graphContainerRef.current.offsetHeight,
      layout: {
        background: { color: "#222" },
        textColor: "#999",
      },
      grid: {
        vertLines: {
          color: "#2f2f2f",
        },
        horzLines: {
          color: "#2f2f2f",
        },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
      },
      timeScale: {
        borderColor: "#ddd",
      },
    });

    const priceSeries = graphInstance.current.addCandlestickSeries({
      upColor: "#00d964",
      downColor: "#ba0402",
      borderDownColor: "#ba0402",
      borderUpColor: "#00d964",
      wickDownColor: "#ba0402",
      wickUpColor: "#00d964",
    });

    priceSeries.setData(series);

    graphInstance.current.applyOptions({
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time, tickMarkType, locale) => {
          const date = new Date(time * 1000);
          if (tickMarkType === TickMarkType.Year) {
            return date.toLocaleDateString(locale, { year: "numeric" });
          } else if (tickMarkType === TickMarkType.Month) {
            return date.toLocaleDateString(locale, {
              month: "short",
              year: "2-digit",
            });
          } else if (tickMarkType === TickMarkType.Day) {
            return date.toLocaleDateString(locale, {
              day: "numeric",
              month: "short",
            });
          }
          return date.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          width: 1,
          color: "#ddd",
          style: LineStyle.LargeDashed,
          labelBackgroundColor: "#313131",
        },
        horzLine: {
          color: "#ddd",
          labelBackgroundColor: "#313131",
        },
      },
    });

    return () => {
      graphInstance.current.remove();
    };
  }, [series]);

  useEffect(() => {
    const resizeGraph = () => {
      graphInstance.current.applyOptions({
        width: graphContainerRef.current.offsetWidth,
        height: graphContainerRef.current.offsetHeight,
      });
    };

    window.addEventListener("resize", resizeGraph);
    return () => window.removeEventListener("resize", resizeGraph);
  }, []);

  return <div ref={graphContainerRef} className="w-full h-full min-h-96" />;
};

export default MarketGraph;
