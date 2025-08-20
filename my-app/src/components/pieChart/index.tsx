import React, { useEffect } from "react";
import Highcharts from "highcharts";
import type { Options } from "highcharts";
import moment from "moment";

interface PieChartProps {
  fakePercentage?: number;
}

const PieChart: React.FC<PieChartProps> = ({ fakePercentage = 75 }) => {
  useEffect(() => {
    const currentDate = moment().format("DD/MM");

    const chartConfig: Options = {
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: 0,
        plotShadow: false,
        width: 250,
        height: 250,
        renderTo: "pie-chart-container",
        backgroundColor: "transparent",
      },
      title: {
        text: `${currentDate} ${fakePercentage}%`,
        align: "center",
        verticalAlign: "middle",
        y: 120,
        style: {
          fontSize: "18px",
          fontWeight: "400",
          color: "#FFFFFF",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          startAngle: 0,
          endAngle: 360,
          center: ["50%", "50%"],
        },
      },
      series: [
        {
          type: "pie",
          innerSize: "98%",
          data: [
            {
              name: "Đạt được",
              y: fakePercentage,
              color: "#FFFFFF",
              borderWidth: 28,
              borderColor: "transparent",
            },
            {
              name: "Chưa đạt được",
              y: 100 - fakePercentage,
              borderWidth: 0,
              color: "transparent",
              borderColor: "transparent",
            },
          ],
        },
      ],
      credits: {
        enabled: false,
      },
    };

    new Highcharts.Chart(chartConfig);
  }, [fakePercentage]);

  return <div id="pie-chart-container" />;
};

export default PieChart;
