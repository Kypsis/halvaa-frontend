import React, { useState } from "react";

import Button from "../Button/Button.component";

import { addDbContact } from "../../utlities/contactsDbActions";
import "./AddContactModal.styles.css";

interface Props {
  currentContactIndex: number;
  setContacts: React.Dispatch<React.SetStateAction<any>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContactModal: React.FC<Props> = props => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phonenumber: "",
    email: ""
  });

  const { name, phonenumber, email } = userDetails;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    /* props.setContacts((prevState: any) => [...prevState, { ...userDetails }]); */

    addDbContact(userDetails, props.setContacts);

    setUserDetails({
      name: "",
      phonenumber: "",
      email: ""
    });

    props.setVisible(false);
  };

  return (
    <div
      className="addmodal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="addmodal-card">
        <h2>Add Contact</h2>
        <form className="addmodal-form" onSubmit={handleSubmit}>
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
            name="phonenumber"
            type="number"
            value={phonenumber}
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
          <div className="addmodal-buttons">
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
