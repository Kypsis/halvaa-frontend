import React, { useState } from "react";

import Button from "../Button/Button.component";

import "./AddContactModal.styles.css";

interface Props {
  setContacts: React.Dispatch<React.SetStateAction<any>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContactModal: React.FC<Props> = props => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    email: ""
  });

  const { name, phoneNumber, email } = userDetails;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.setContacts((prevState: any) => [...prevState, { ...userDetails }]);
    setUserDetails({
      name: "",
      phoneNumber: "",
      email: ""
    });
    props.setVisible(false);
  };

  return (
    <div
      className="modal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="modal-card">
        <h2>Add Contact</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <span>
            <b>Name</b>
          </span>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
          <span>
            <b>Phone Number</b>
          </span>
          <input
            name="phoneNumber"
            type="number"
            value={phoneNumber}
            pattern="[0-9]*"
            onChange={handleChange}
            required
          />
          <span>
            <b>Email</b>
          </span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <Button style={{ width: "8em" }}>Add Contact</Button>
            <Button
              style={{ width: "8em" }}
              onClick={e => {
                e.preventDefault();
                props.setVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
