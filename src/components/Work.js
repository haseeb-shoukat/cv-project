import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Work = () => {
  const [work, setWork] = useState([]);
  const [current, setCurrent] = useState({
    key: uuidv4(),
    name: "",
    title: "",
    from: "",
    to: "",
    tasks: "",
    state: "form",
  });

  const alterState = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const arr = [...work];

    const { name, title, from, to, tasks } = Object.fromEntries(
      new FormData(e.target)
    );
    arr.splice(
      arr.findIndex((item) => item.key === id),
      1,
      { key: id, name, title, from, to, tasks, state: "display" }
    );
    setWork(arr);
  };

  const deleteTask = (id) => setWork(work.filter((item) => item.key !== id));

  const Experience = ({ id, name, title, from, to, tasks, state }) => {
    if (state === "form") {
      return (
        <form id={id} onSubmit={alterState}>
          <label>
            Company Name:
            <input
              name="name"
              placeholder="Microsoft"
              type="text"
              defaultValue={name}
              required
            />
          </label>
          <label>
            Job Title:
            <input
              name="title"
              placeholder="Software Engineer"
              type="text"
              defaultValue={title}
              required
            />
          </label>
          <label>
            From:
            <input name="from" type="date" defaultValue={from} required />
          </label>
          <label>
            To:
            <input name="to" type="date" defaultValue={to} required />
          </label>
          <label className="text-box">
            Main Tasks:
            <textarea
              name="tasks"
              placeholder="Worked as Senior Developer on React Native Project"
              defaultValue={tasks}
              rows="4"
              required
            />
          </label>
          <input
            type="submit"
            className="save-button"
            name="send"
            value="Save"
          />
          <input
            type="button"
            onClick={deleteTask.bind(null, id)}
            className="delete-button"
            name="send"
            value="Delete"
          />
        </form>
      );
    }
    return (
      <div className="section-package">
        <div>
          <span className="package-heading">Company Name:</span> {name}
        </div>
        <div>
          <span className="package-heading">Job Title:</span> {title}
        </div>
        <div>
          <span className="package-heading">From:</span> {from}
        </div>
        <div>
          <span className="package-heading">To:</span> {to}
        </div>
        <div>
          <span className="package-heading">Main Tasks:</span> {tasks}
        </div>
        <button className="edit-btn" onClick={editWork.bind(null, id)}>
          Edit
        </button>
      </div>
    );
  };

  const editWork = (id) => {
    let arr = [...work];
    arr = arr.map((item) => {
      if (item.key === id) {
        item.state = "form";
      }
      return item;
    });
    setWork(arr);
  };

  const addWork = () => {
    setWork([...work, current]);
    setCurrent({
      key: uuidv4(),
      name: "",
      title: "",
      from: "",
      to: "",
      tasks: "",
      state: "form",
    });
  };

  return (
    <div className="main-section">
      <div className="main-heading">Work Experience</div>
      {work.map(({ key, name, title, from, to, tasks, state }) => (
        <Experience
          key={key}
          id={key}
          name={name}
          title={title}
          from={from}
          to={to}
          tasks={tasks}
          state={state}
        />
      ))}
      <button className="add-button" onClick={addWork}>
        Add
      </button>
    </div>
  );
};

export default Work;
