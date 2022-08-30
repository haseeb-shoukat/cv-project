import React from "react";

export default class Education extends React.Component {
  constructor() {
    super();
    this.state = { education: [] };
  }

  Experience = ({ name, title, from, to }) => {
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

  render() {
    return (
      <div>
        <div class="main-heading">Education</div>
        {this.state.education.map(({ name, title, from, to }) => {
          <this.Experience name={name} title={title} from={from} to={to} />;
        })}
        <button onClick={addEducation}>Add</button>
      </div>
    );
  }
}
