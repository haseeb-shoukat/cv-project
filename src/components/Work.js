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
    const event = e.nativeEvent.submitter.value;
    const arr = [...this.state.work];

    if (event === "Delete") {
      this.setState({
        work: arr.filter((item) => item.key !== id),
      });
    } else {
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
    }
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
          <label>
            Main Tasks:
            <textarea
              name="tasks"
              placeholder="Worked as Senior Developer on React Native Project"
              defaultValue={tasks}
              required
            />
          </label>
          <input type="submit" name="send" value="Save" />
          <input type="submit" name="send" value="Delete" />
        </form>
      );
    }
    return (
      <div>
        <div>Company Name: {name}</div>
        <div>Job Title: {title}</div>
        <div>From: {from}</div>
        <div>To: {to}</div>
        <div>Main Tasks: {tasks}</div>
        <button onClick={this.editWork.bind(null, id)}>Edit</button>
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
      <div>
        <div className="main-heading">Work Experience:</div>
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
        <button onClick={this.addWork}>Add</button>
      </div>
    );
  }
}
