import React from "react";

export default class General extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "form",
    };
  }

  switchToForm = () => {
    this.setState({ state: "form" });
  };

  switchToDisplay = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = Object.fromEntries(
      new FormData(e.target)
    );
    this.setState({
      firstName,
      lastName,
      email,
      phone,
      state: "display",
    });
  };

  GeneralForm = () => {
    const { firstName, lastName, email, phone } = this.state;

    return (
      <form onSubmit={this.switchToDisplay}>
        <label htmlFor="first-name">First Name:</label>
        <input
          name="firstName"
          placeholder="Andrew"
          id="first-name"
          type="text"
          defaultValue={firstName}
          required
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          name="lastName"
          placeholder="Schlitz"
          id="last-name"
          type="text"
          defaultValue={lastName}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          placeholder="madmax@yahoo.com"
          pattern="\w+@\w+(.\w+)?$"
          id="email"
          type="email"
          defaultValue={email}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          name="phone"
          placeholder="021-34567891"
          id="phone"
          type="tel"
          defaultValue={phone}
          required
        />
        <input defaultValue="Save" type="submit" />
      </form>
    );
  };

  GeneralDisplay = () => {
    const { firstName, lastName, email, phone } = this.state;

    return (
      <div>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
        <div>Email: {email}</div>
        <div>Phone: {phone}</div>
        <button onClick={this.switchToForm}>Edit</button>
      </div>
    );
  };

  render() {
    if (this.state.state === "form") return <this.GeneralForm />;
    return <this.GeneralDisplay />;
  }
}
