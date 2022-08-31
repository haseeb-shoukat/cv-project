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
        <label>
          First Name:
          <input
            name="firstName"
            placeholder="Andrew"
            type="text"
            defaultValue={firstName}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            name="lastName"
            placeholder="Schultz"
            type="text"
            defaultValue={lastName}
            required
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            placeholder="madmax@yahoo.com"
            pattern="\w+@\w+(.\w+)?$"
            type="email"
            defaultValue={email}
            required
          />
        </label>
        <label>
          Phone:
          <input
            name="phone"
            placeholder="021-34567891"
            type="tel"
            defaultValue={phone}
            required
          />
        </label>
        <input className="general-submit" defaultValue="Save" type="submit" />
      </form>
    );
  };

  GeneralDisplay = () => {
    const { firstName, lastName, email, phone } = this.state;

    return (
      <div className="section-package">
        <div>
          <span className="package-heading">First Name:</span> {firstName}
        </div>
        <div>
          <span className="package-heading">Last Name:</span> {lastName}
        </div>
        <div>
          <span className="package-heading">Email:</span> {email}
        </div>
        <div>
          <span className="package-heading">Phone:</span> {phone}
        </div>
        <button className="edit-btn" onClick={this.switchToForm}>
          Edit
        </button>
      </div>
    );
  };

  render() {
    let section;
    this.state.state === "form"
      ? (section = <this.GeneralForm />)
      : (section = <this.GeneralDisplay />);

    return (
      <div className="main-section">
        <div className="main-heading">General</div>
        {section}
      </div>
    );
  }
}
