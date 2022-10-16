import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const TaskCard = ({ task, getApi }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isInput, setIsInput] = useState(false);

  const submit = (data) => {
    axios
      .put(`https://laraveltasks.fly.dev/api/tasks/${task.id_task}`, data)
      .then(() => {
        setIsInput(false);
        getApi();
      })
      .catch((error) => console.log(error.response));
  };

  const deleteTask = () => {
    axios
      .delete(`https://laraveltasks.fly.dev/api/tasks/${task.id_task}`)
      .then(() => getApi());
  };
  return !isInput ? (
    <li
      className="card-task"
      style={{ backgroundColor: task.color }}
      key={task.id_task}
    >
      <h3>{task.title_task} </h3>
      <p>{task.description}</p>
      <button
        className="btn-edit"
        type="button"
        onClick={() => {
          setIsInput(true);

          reset({
            title: task.title_task,
            description: task.description,
            start: task.start,
            end: task.end,
            color: task.color,
          });
        }}
      >
        <i className="fa-regular fa-pen-to-square"></i> Edit
      </button>
      <br />
    </li>
  ) : (
    <li
      className="card-task"
      style={{ backgroundColor: task.color }}
      key={task.id_task}
    >
      <form onSubmit={handleSubmit(submit)}>
        <label htmlFor="title">Title:</label>
        <br />
        <input required type="text" id="title" {...register("title_task")} />
        <br />
        <label htmlFor="description">Description:</label>
        <br />

        <textarea id="description" {...register("description")}></textarea>

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
        <button className="btn-edit">
          <i className="fa-regular fa-pen-to-square"></i> Update
        </button>
      </form>

      <button
        className="btn-cancel"
        type="button"
        onClick={() => setIsInput(false)}
      >
        <i className="fa-solid fa-ban"></i> Cancel
      </button>
      <button className="btn-delete" type="button" onClick={deleteTask}>
        <i className="fa-solid fa-trash"></i> Delete
      </button>
      <br />
    </li>
  );
};

export default TaskCard;
