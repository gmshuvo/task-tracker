import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns"; // Import the date adapter
import { format, subDays, startOfDay, endOfDay } from "date-fns";

const WeeklyBarChart = ({ task }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && task) {
      if (chartInstance.current) {
        // If a Chart instance exists, destroy it
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");

      // Calculate the data for the chart
      const data = task.activityLog.map((entry) => ({
        x: new Date(entry.startTime),
        y: entry.endTime - entry.startTime,
      }));

      // Calculate the last 7 days
      const last7Days = [...Array(8).keys()].map((daysAgo) => {
        const day = subDays(new Date(), daysAgo);
        return format(day, "yyyy-MM-dd");
      });

      const datasets = last7Days.map((day) => {
        const dayStart = startOfDay(new Date(day));
        const dayEnd = endOfDay(new Date(day));
        const totalActivityTime = data.reduce((acc, entry) => {
          const entryStart = entry.x;
          const entryEnd = new Date(entryStart.getTime() + entry.y);
          if (entryStart >= dayStart && entryEnd <= dayEnd) {
            return acc + entry.y;
          }
          return acc;
        }, 0);

        return {
          label: day,
          data: [{ x: new Date(day), y: totalActivityTime }],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],

          borderWidth: 1,
        };
      });

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          datasets: datasets,
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "PP", // Date format for tooltips
              },
              title: {
                display: true,
                text: "Day",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Activity Duration (ms)",
              },
            },
          },
        },
      });
    }
  }, [task]);

  return (
    <div className="mt-10 w-[70%] h-[70%] flex m-auto">
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeeklyBarChart;
