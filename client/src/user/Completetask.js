import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Completetask() {
  const location = useLocation();
  const [task, setTask] = useState({});
  const [efficiency, setEfficiency] = useState("");

  useEffect(() => {
    let param = { id: location.state.id };
    fetch("http://127.0.0.1:5000/user/completetask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => setTask(result));
  }, [location.state.id]);

  const Update = () => {
    let params = { id: location.state.id, status: 1 };
    fetch("http://localhost:5000/user/updatetask", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setEfficiency(result.efficiency);
      });
  };

  return (
    <>
      <h2>Task Update</h2>
      <p>Task name : {task.taskname}</p>
      <p>Deadline  : {task.deadline}</p>
      <p>Priority  : {task.priority}</p>
      <p>Status    : {task.status === 1 ? 'Complete' : 'Incomplete'}</p>
      {efficiency && <p>Efficiency: {efficiency}</p>}
      <button className='btn btn-primary' onClick={Update}>Complete this task</button>
    </>
  );
}

export default Completetask;
