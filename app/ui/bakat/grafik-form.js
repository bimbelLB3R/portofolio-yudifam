"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function GrafikBakatForm({ detailBakatByNama }) {
  //   console.log(detailBakatByNama);
  const data = detailBakatByNama;
  // Menghitung total data
  const totalData = data.length;
  // Menghitung jumlah setiap bakat
  const countData = data.reduce((acc, data) => {
    acc[data] = (acc[data] || 0) + 1;
    return acc;
  }, {});
  // Menghitung persentase
  const percentages = {};
  for (const key in countData) {
    percentages[key] = (countData[key] / totalData) * 100;
  }
  // Mengurutkan data persentase
  const sortedPercentages = Object.entries(percentages).sort(
    ([, a], [, b]) => b - a
  );
  // Mengambil 7 data tertinggi
  const top7 = sortedPercentages.slice(0, 7);
  //   console.log(top7);

  // grafik start
  // Persiapkan label dan data
  const labelTabel = top7.map((item) => item[0]);
  const dataTabel = top7.map((item) => item[1]);
  const dataKeTabel = { labels: labelTabel, values: dataTabel };
  const chartRef = useRef(null);
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    // Tambahkan warna lain jika diperlukan
  ];
  useEffect(() => {
    let chartInstance;
    const ctx = chartRef.current.getContext("2d");
    // Create or update the chart instance
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart
    }

    chartInstance = new Chart(
      ctx,
      {
        // Chart configuration
        type: "bar",
        data: {
          labels: dataKeTabel.labels,
          datasets: [
            {
              label: "Persentase",
              data: dataKeTabel.values,
              backgroundColor: colors, // Warna latar belakang batang
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                // Tambahkan warna lain jika diperlukan
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      },
      [dataKeTabel]
    );

    return () => {
      chartInstance.destroy(); // Clean up the chart instance on component unmount
    };
  });
  return <canvas ref={chartRef} />;
}
