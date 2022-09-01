import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Education = () => {
  const [education, setEducation] = useState([]);
  const [current, setCurrent] = useState({
    key: uuidv4(),
    name: "",
    title: "",
    from: "",
    to: "",
    state: "form",
  });

  const alterState = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const arr = [...education];

    const { name, title, from, to } = Object.fromEntries(
      new FormData(e.target)
    );
    arr.splice(
      arr.findIndex((item) => item.key === id),
      1,
      { key: id, name, title, from, to, state: "display" }
    );
    setEducation(arr);
  };

  const deleteTask = (id) =>
    setEducation(education.filter((item) => item.key !== id));

  const Experience = ({ id, name, title, from, to, state }) => {
    if (state === "form") {
      return (
        <form id={id} onSubmit={alterState}>
          <label>
            Institution Name:
            <input
              name="name"
              placeholder="Cedar College"
              type="text"
              defaultValue={name}
              required
            />
          </label>
          <label>
            Education:
            <input
              name="title"
              placeholder="A levels"
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
          <input
            type="submit"
            className="save-button"
            name="send"
            value="Save"
          />
          <input
            type="button"
            className="delete-button"
            name="send"
            onClick={deleteTask.bind(null, id)}
            value="Delete"
          />
        </form>
      );
    }

    return (
      <div className="section-package">
        <div>
          <span className="package-heading">Institution Name:</span> {name}
        </div>
        <div>
          <span className="package-heading">Education:</span> {title}
        </div>
        <div>
          <span className="package-heading">From:</span> {from}
        </div>
        <div>
          <span className="package-heading">To:</span> {to}
        </div>
        <button className="edit-btn" onClick={editEducation.bind(null, id)}>
          Edit
        </button>
      </div>
    );
  };

  const editEducation = (id) => {
    let arr = [...education];
    arr = arr.map((item) => {
      if (item.key === id) {
        item.state = "form";
      }
      return item;
    });
    setEducation(arr);
  };

  const addEducation = () => {
    setEducation([...education, current]);
    setCurrent({
      key: uuidv4(),
      name: "",
      title: "",
      from: "",
      to: "",
      state: "form",
    });
  };

  return (
    <div className="main-section">
      <div className="main-heading">Education</div>
      {education.map(({ key, name, title, from, to, state }) => (
        <Experience
          key={key}
          id={key}
          name={name}
          title={title}
          from={from}
          to={to}
          state={state}
        />
      ))}
      <button className="add-button" onClick={addEducation}>
        Add
      </button>
    </div>
  );
};

export default Education;
