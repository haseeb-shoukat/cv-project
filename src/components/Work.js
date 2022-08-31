import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class Work extends React.Component {
  constructor() {
    super();
    this.state = {
      work: [],
      current: {
        key: uuidv4(),
        name: "",
        title: "",
        from: "",
        to: "",
        tasks: "",
        state: "form",
      },
    };
  }

  alterState = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const arr = [...this.state.work];

    const { name, title, from, to, tasks } = Object.fromEntries(
      new FormData(e.target)
    );
    arr.splice(
      arr.findIndex((item) => item.key === id),
      1,
      { key: id, name, title, from, to, tasks, state: "display" }
    );
    this.setState({
      work: arr,
    });
  };

  deleteTask = (id) => {
    this.setState({
      work: this.state.work.filter((item) => item.key !== id),
    });
  };

  Experience = ({ id, name, title, from, to, tasks, state }) => {
    if (state === "form") {
      return (
        <form id={id} onSubmit={this.alterState}>
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
            onClick={this.deleteTask.bind(null, id)}
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
        <button className="edit-btn" onClick={this.editWork.bind(null, id)}>
          Edit
        </button>
      </div>
    );
  };

  editWork = (id) => {
    let arr = [...this.state.work];
    arr = arr.map((item) => {
      if (item.key === id) {
        item.state = "form";
      }
      return item;
    });
    this.setState({ work: arr });
  };

  addWork = () => {
    this.setState({
      work: [...this.state.work, this.state.current],
      current: {
        key: uuidv4(),
        name: "",
        title: "",
        from: "",
        to: "",
        tasks: "",
        state: "form",
      },
    });
  };

  render() {
    return (
      <div className="main-section">
        <div className="main-heading">Work Experience</div>
        {this.state.work.map(({ key, name, title, from, to, tasks, state }) => (
          <this.Experience
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
        <button className="add-button" onClick={this.addWork}>
          Add
        </button>
      </div>
    );
  }
}
