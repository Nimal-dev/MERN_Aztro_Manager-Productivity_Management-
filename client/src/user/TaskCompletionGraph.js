import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';

function TaskCompletionGraph({ taskId, deadline }) {
  const [completionHistory, setCompletionHistory] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/getTaskCompletionHistory/${taskId}`)
      .then((res) => res.json())
      .then((result) => {
        setCompletionHistory(result);
      })
      .catch(error => console.error('Error fetching task completion history:', error));
  }, [taskId]);

  const deadlineDate = new Date(deadline).setHours(0, 0, 0, 0);

  const allDates = completionHistory.length > 0 
    ? Array.from(
        { length: (new Date() - new Date(completionHistory[0].date)) / (1000 * 60 * 60 * 24) + 1 },
        (_, i) => new Date(new Date(completionHistory[0].date).getTime() + i * (1000 * 60 * 60 * 24)).toLocaleDateString()
      )
    : [];

  const completionData = allDates.map(date => {
    const record = completionHistory.find(record => new Date(record.date).toLocaleDateString() === date);
    return record ? record.completion : null;
  });

  // Fill missing data points with the last known completion percentage
  for (let i = 1; i < completionData.length; i++) {
    if (completionData[i] === null) {
      completionData[i] = completionData[i - 1];
    }
  }

  const data = {
    labels: allDates,
    datasets: [
      {
        label: 'Completion Percentage',
        data: completionData,
        fill: false,
        backgroundColor: 'blue',
        borderColor: (ctx) => {
          const index = ctx.dataIndex;
          const currentDate = new Date(allDates[index]).getTime();
          return currentDate > deadlineDate ? 'red' : 'blue';
        },
        segment: {
          borderColor: (ctx) => {
            const index = ctx.p0DataIndex;
            const currentDate = new Date(allDates[index]).getTime();
            return currentDate > deadlineDate ? 'red' : 'blue';
          },
        },
        borderWidth: 2,
      },
      {
        label: 'Deadline',
        data: allDates.map(date => 
          new Date(date).getTime() === deadlineDate ? 100 : null),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ]
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default TaskCompletionGraph;










// import React, { useState, useEffect } from "react";
// import { Line } from 'react-chartjs-2';

// function TaskCompletionGraph({ taskId, deadline }) {
//   const [completionHistory, setCompletionHistory] = useState([]);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/user/getTaskCompletionHistory/${taskId}`)
//       .then((res) => res.json())
//       .then((result) => {
//         setCompletionHistory(result);
//       })
//       .catch(error => console.error('Error fetching task completion history:', error));
//   }, [taskId]);

//   // Extract dates and completion percentages only for the available dates
//   const dates = completionHistory.map(record => new Date(record.date).toLocaleDateString());
//   const completions = completionHistory.map(record => record.completion);

//   const data = {
//     labels: dates,
//     datasets: [
//       {
//         label: 'Completion Percentage',
//         data: completions,
//         fill: false,
//         backgroundColor: 'blue',
//         borderColor: 'blue',
//       },
//       {
//         label: 'Deadline',
//         data: dates.map(date => (new Date(date).getTime() === new Date(deadline).setHours(0, 0, 0, 0)) ? 100 : null),
//         fill: false,
//         backgroundColor: 'red',
//         borderColor: 'red',
//         borderDash: [5, 5],
//         pointRadius: 0,
//       }
//     ]
//   };

//   const options = {
//     scales: {
//       y: {
//         min: 0,
//         max: 100,
//         beginAtZero: true,
//         ticks: {
//           stepSize: 10
//         }
//       },
//       x: {
//         type: 'time',
//         time: {
//           unit: 'day',
//         },
//       },
//     }
//   };

//   return <Line data={data} options={options} />;
// }

// export default TaskCompletionGraph;
