import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the datalabel plugin

// Register chart components and plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the datalabel plugin
);

const Chart = ({ data }) => {
  // Calculate the count of payments by status
  const statusCount = data.reduce((acc, item) => {
    const { status } = item;
    if (!acc[status]) {
      acc[status] = 0; // Initialize count for each status
    }
    acc[status] += 1; // Count the number of payments for each status
    return acc;
  }, {});

  // Extract unique statuses and their counts
  const statuses = Object.keys(statusCount);
  const counts = statuses.map(status => statusCount[status]);

  // Calculate total count
  const totalCount = data.length;

  // Prepare chart data
  const chartData = {
    labels: [...statuses, 'Total Payments'], // Adding 'Total Payments' as a label
    datasets: [
      {
        label: 'Payment Status',
        data: [...counts, totalCount], // Adding the total count as a new data point
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        datalabels: {
          // Display count inside the bars
          align: 'center',
          anchor: 'center',
          color: 'black',
          font: {
            weight: 'bold',
            size: 14,
          },
          formatter: function(value) {
            return value; // Show the count in the bar
          }
        }
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} payments`;
          }
        }
      },
      datalabels: {
        // Show the total payment count on top of the chart
        display: true,
        color: 'black',
        font: {
          weight: 'bold',
          size: 16,
        },
        formatter: function() {
          return `Total: ${totalCount}`; // Display total count on the top
        },
        position: 'top'
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center">Payments and Status Summary</h2>

      {/* Bar Chart */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Chart;
