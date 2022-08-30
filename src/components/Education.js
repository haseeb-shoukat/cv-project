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
    const event = e.nativeEvent.submitter.value;
    const arr = [...this.state.education];

    if (event === "Delete") {
      this.setState({
        education: arr.filter((item) => item.id !== id),
      });
    } else {
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
    }
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
          <input type="submit" name="send" value="Save" />
          <input type="submit" name="send" value="Delete" />
        </form>
      );
    }
    return (
      <div>
        <div>Institution Name: {name}</div>
        <div>Education: {title}</div>
        <div>From: {from}</div>
        <div>To: {to}</div>
        <button>Edit</button>
      </div>
    );
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
    console.log(this.state);
    return (
      <div>
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
        <button onClick={this.addEducation}>Add</button>
      </div>
    );
  }
}
