import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class Education extends React.Component {
  constructor() {
    super();
    this.state = {
      education: [],
      current: {
        key: uuidv4(),
        name: "",
        title: "",
        from: "",
        to: "",
        state: "form",
      },
    };
  }

  alterState = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const arr = [...this.state.education];

    const { name, title, from, to } = Object.fromEntries(
      new FormData(e.target)
    );
    arr.splice(
      arr.findIndex((item) => item.key === id),
      1,
      { key: id, name, title, from, to, state: "display" }
    );
    this.setState({
      education: arr,
    });
  };

  deleteTask = (id) => {
    this.setState({
      education: this.state.education.filter((item) => item.key !== id),
    });
  };

  Experience = ({ id, name, title, from, to, state }) => {
    if (state === "form") {
      return (
        <form id={id} onSubmit={this.alterState}>
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
            onClick={this.deleteTask.bind(null, id)}
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
        <button
          className="edit-btn"
          onClick={this.editEducation.bind(null, id)}
        >
          Edit
        </button>
      </div>
    );
  };

  editEducation = (id) => {
    let arr = [...this.state.education];
    arr = arr.map((item) => {
      if (item.key === id) {
        item.state = "form";
      }
      return item;
    });
    this.setState({ education: arr });
  };

  addEducation = () => {
    this.setState({
      education: [...this.state.education, this.state.current],
      current: {
        key: uuidv4(),
        name: "",
        title: "",
        from: "",
        to: "",
        state: "form",
      },
    });
  };

  render() {
    return (
      <div className="main-section">
        <div className="main-heading">Education</div>
        {this.state.education.map(({ key, name, title, from, to, state }) => (
          <this.Experience
            key={key}
            id={key}
            name={name}
            title={title}
            from={from}
            to={to}
            state={state}
          />
        ))}
        <button className="add-button" onClick={this.addEducation}>
          Add
        </button>
      </div>
    );
  }
}
