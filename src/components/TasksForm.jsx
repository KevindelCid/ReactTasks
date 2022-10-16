import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TaskCard from "./TaskCard";
const TasksForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const clear = () => {
    reset({
      title: "",
      description: "",
    });
  };
  const submit = (data) => {
    axios
      .post("https://laraveltasks.fly.dev/api/tasks", data)
      .then(() => {
        clear();
        getApi();
        setIsVisible(false);
      })
      .catch((error) => console.log(error.response));
  };
  useEffect(() => {
    getApi();
  }, []);
  const getApi = () => {
    axios.get("https://laraveltasks.fly.dev/api/tasks").then((res) => {
      setTasks(res.data);
    });
  };

  return (
    <ul className="card-task-container">
      {isVisible ? (
        <li className="card-task create-task-pop">
          <form onSubmit={handleSubmit(submit)}>
            <h1>Create Tasks</h1>

            <div className="inputs-1">
              <label htmlFor="title">Title:</label>
              <input
                required
                type="text"
                id="title"
                {...register("title_task")}
              />

              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                {...register("description")}
              ></textarea>
            </div>
            <div className="inputs-2">
              <div className="date">
                <label htmlFor="title">Start:</label>

                <input type="date" id="start" {...register("start")} />
              </div>
              <div className="date">
                <label htmlFor="end">End:</label>

                <input type="date" id="end" {...register("end")} />
              </div>
            </div>

            <label htmlFor="title">Color:</label>

            <input
              className="color-input"
              type="color"
              id="color"
              {...register("color")}
            />
            <br />

            <button className="btn-create">Create Task</button>
          </form>
          <button
            className="btn-cancel"
            onClick={() => setIsVisible(!isVisible)}
          >
            <i className="fa-solid fa-ban"></i> Cancelar
          </button>
        </li>
      ) : (
        <div>
          <button type="button" className="fresh" onClick={() => getApi()}>
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
          <button
            type="button"
            className="add-task-fixed"
            onClick={() => setIsVisible(!isVisible)}
          >
            <i className="fa-solid fa-plus"></i>{" "}
          </button>
        </div>
      )}
      {tasks.map((task) => (
        <TaskCard task={task} getApi={getApi} key={task.id_task} />
      ))}
    </ul>
  );
};

export default TasksForm;
