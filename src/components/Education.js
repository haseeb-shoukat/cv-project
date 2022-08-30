import React from "react";
import { v4 as uuidv4 } from "uuid";

export default class Education extends React.Component {
  constructor() {
    super();
    this.state = {
      education: [],
      current: {
        id: uuidv4(),
        name: "",
        title: "",
        from: "",
        to: "",
        state: "form",
      },
    };
  }

  alterState = (e) => {
    console.log(e.target);
  };

  Experience = ({ id, name, title, from, to, state }) => {
    if (state === "form") {
      return (
        <form id={id} onSubmit={this.alterState}>
          <label>
            Institution Name:
            <input
              name="schoolName"
              placeholder="Cedar College"
              type="text"
              defaultValue={name}
              required
            />
          </label>
          <label>
            Education:
            <input
              name="education"
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
          <button type="submit" name="send" value="save">
            Save
          </button>
          <button type="submit" name="send" value="delete">
            Delete
          </button>
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
        id: uuidv4(),
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
      <div>
        <div class="main-heading">Education</div>
        {this.state.education.map(({ id, name, title, from, to, state }) => {
          <this.Experience
            id={id}
            name={name}
            title={title}
            from={from}
            to={to}
            state={state}
          />;
        })}
        <button onClick={addEducation}>Add</button>
      </div>
    );
  }
}
