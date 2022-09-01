import React, { useState } from "react";

const General = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("form");

  const switchToForm = () => setState("form");

  const switchToDisplay = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = Object.fromEntries(
      new FormData(e.target)
    );

    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setPhone(phone);
    setState("display");
  };

  const GeneralForm = () => {
    return (
      <form onSubmit={switchToDisplay}>
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

  const GeneralDisplay = () => {
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
        <button className="edit-btn" onClick={switchToForm}>
          Edit
        </button>
      </div>
    );
  };

  return (
    <div className="main-section">
      <div className="main-heading">General</div>
      {state === "form" ? <GeneralForm /> : <GeneralDisplay />}
    </div>
  );
};

export default General;
