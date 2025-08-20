import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import type { Options, Chart as HighchartsChart } from 'highcharts';
import "./styles.scss";

// Kiểu dữ liệu cho từng item trong data
interface DataItem {
  date: string;
  weight: number;
  bodyFatPercentage: number;
}

// Kiểu props
interface ChartProps {
  title?: string;
  isHideButton?: boolean;
}

const Chart: React.FC<ChartProps> = ({ title = '', isHideButton = false }) => {
  const [dataByDay, setDataByDay] = useState<DataItem[]>([]);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<HighchartsChart | null>(null);

  // Hàm tạo data giả
  const generateDataForDay = (date: string): DataItem => {
    return {
      date,
      weight: parseFloat((Math.random() * 100).toFixed(2)), // Fake body weight
      bodyFatPercentage: parseFloat((Math.random() * 50).toFixed(2)) // Fake body fat percentage
    };
  };

  const numDays = 30;

  // Lấy data giả 30 ngày
  useEffect(() => {
    const today = new Date();
    const dataByDayArr: DataItem[] = Array.from({ length: numDays }, (_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - index);
      return generateDataForDay(currentDate.toISOString().slice(0, 10));
    });
    setDataByDay(dataByDayArr);
  }, []);

  // Render chart khi có data
  useEffect(() => {
    if (!chartRef.current || dataByDay.length === 0) return;

    const weightData = dataByDay.map((dataItem) => ({
      x: new Date(dataItem.date).getTime(),
      y: dataItem.weight
    }));

    const bodyFatData = dataByDay.map((dataItem) => ({
      x: new Date(dataItem.date).getTime(),
      y: dataItem.bodyFatPercentage
    }));

    const options: Options = {
      chart: {
        type: 'spline',
        backgroundColor: '#2E2E2E',
      },
      title: {
        text: title,
        align: 'left',
        style: {
          color: '#FFF',
          fontSize: "15px",
          fontWeight: "400",
        }
      },
      xAxis: {
        type: 'datetime',
        gridLineColor: '#777777',
        gridLineWidth: 1,
        labels: {
          style: { color: '#FFFFFF' }
        }
      },
      yAxis: [
        {
          title: { text: '', style: { color: '#FFFFFF' } },
          gridLineColor: 'transparent',
          gridLineWidth: 0,
          enabled: false
        },
        {
          title: { text: '', style: { color: '#FFFFFF' } },
          gridLineColor: 'transparent',
          gridLineWidth: 0,
          opposite: true,
          enabled: false
        }
      ],
      series: [
        {
          name: 'Weight',
          data: weightData,
          type: 'spline',
          color: '#8FE9D0',
          marker: { enabled: true, symbol: 'circle', radius: 4 }
        },
        {
          name: 'Body Fat Percentage',
          data: bodyFatData,
          type: 'spline',
          color: '#FFCC21',
          yAxis: 1,
          marker: { enabled: true, symbol: 'square', radius: 4 }
        }
      ],
      legend: { enabled: false },
      credits: { enabled: false }
    };

    // Destroy chart cũ trước khi render chart mới
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = Highcharts.chart(chartRef.current, options);

    // Cleanup khi unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [dataByDay, title]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={chartRef} style={{ height: !isHideButton ? '88%' : '100%' }} />
      {!isHideButton && (
        <div style={{ position: 'absolute', left: '10px', bottom: '10px' }} className="chart-button-option">
          <button>日</button>
          <button>週</button>
          <button>月</button>
          <button>年</button>
        </div>
      )}
    </div>
  );
};

export default Chart;
