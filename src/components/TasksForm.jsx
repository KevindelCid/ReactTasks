import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TaskCard from "./TaskCard";
const TasksForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [isInput, setIsInput] = useState(false);

  const clear = () => {
    reset({
      title: "",
      description: "",
    });
  };
  const submit = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/tasks", data)
      .then(() => {
        clear();
        getApi();
      })
      .catch((error) => console.log(error.response));
  };
  useEffect(() => {
    getApi();
  }, []);
  const getApi = () => {
    axios.get("http://127.0.0.1:8000/api/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  return (
    <ul className="card-task-container">
      <li className="card-task">
        <form onSubmit={handleSubmit(submit)}>
          <h1>Create Tasks</h1>

          <label htmlFor="title">Title:</label>
          <br />
          <input type="text" id="title" {...register("title")} />

          <label htmlFor="description">Description</label>
          <br />
          <input type="text" id="description" {...register("description")} />
          <br />
          <label htmlFor="title">Start:</label>
          <br />
          <input type="date" id="start" {...register("start")} />
          <br />
          <label htmlFor="end">End:</label>
          <br />
          <input type="date" id="end" {...register("end")} />
          <br />
          <label htmlFor="title">Color:</label>
          <br />
          <input
            className="color-input"
            type="color"
            id="color"
            {...register("color")}
          />
          <br />

          <button className="btn-create">Crear nueva tarea</button>
        </form>
      </li>

      {tasks.map((task) => (
        <TaskCard task={task} getApi={getApi} key={task.id_task} />
      ))}
    </ul>
  );
};

export default TasksForm;
