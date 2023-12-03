import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns"; // Import the date adapter
import { format, subDays, startOfDay, endOfDay } from "date-fns";

const WeeklyBarChart = ({ task }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  console.log("task", task);

  useEffect(() => {
    if (chartRef.current && task) {
      if (chartInstance.current) {
        // If a Chart instance exists, destroy it
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");

      // Calculate the data for the chart
      const data = task?.activityLog?.map((entry) => ({
        x: new Date(entry.startTime),
        y: ((new Date(entry.endTime) - new Date(entry.startTime)) + (60 * 60 * 1000)), // Convert milliseconds to hours
      }));

      console.log("data", data);

      // Calculate the last 7 days
      const last7Days = [...Array(8).keys()].map((daysAgo) => {
        const day = subDays(new Date(), daysAgo);
        return format(day, "yyyy-MM-dd");
        const reversedLast7Days = last7Days.slice().reverse(); 
      });

      const datasets = last7Days?.map((day) => {
        const dayStart = startOfDay(new Date(day));
        const dayEnd = endOfDay(new Date(day));
        // console.log("dayStart", dayStart);
        // console.log("dayEnd", dayEnd);
        const totalActivityTime = data.reduce((acc, entry) => {
          const entryStart = entry.x;
          const entryEnd = new Date(entryStart.getTime() + entry.y);
          console.log("entryStart", entryStart);
          console.log("entryEnd", entryEnd);
          if (entryStart >= dayStart && entryEnd <= dayEnd) {
            return acc + entry.y;
          }
          return acc;
        }, 0) / (1000 * 60 * 60);

        // console.log("totalActivityTime", totalActivityTime);

        // console.log(day)
        return {
          label: day,
          data: [{ x: new Date(day), y: totalActivityTime }],
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
              max: 24, // Set max value to 24 hours
              title: {
                display: true,
                text: "Activity Duration (hours)",
              },
            },
          },
        },
      });
    }
  }, [task]);

  return (
    <div className="mt-10 w-[70%] h-[70%] flex m-auto ">
      <canvas ref={chartRef} className="text-white" />
    </div>
  );
};

export default WeeklyBarChart;
