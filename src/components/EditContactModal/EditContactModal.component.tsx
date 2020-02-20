import React, { useState, useEffect } from "react";

import Button from "../Button/Button.component";
import { ContactList } from "../Contacts/Contacts.component";

import "./EditContactModal.styles.css";

interface Props {
  currentContactIndex: number;
  contacts: ContactList;
  setContacts(prevState: any): void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditContactModal: React.FC<Props> = props => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phoneNumber: "",
    email: ""
  });

  const { name, phoneNumber, email } = userDetails;

  useEffect(() => {
    setUserDetails({
      name: props?.contacts[props.currentContactIndex]?.name,
      phoneNumber: props?.contacts[props.currentContactIndex]?.phoneNumber,
      email: props?.contacts[props.currentContactIndex]?.email
    });
  }, [props, props.contacts, props.currentContactIndex, props.visible]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.setContacts((prevState: any) =>
      prevState.map((contact: { [key: string]: string }) =>
        contact.name === prevState[props.currentContactIndex].name
          ? { ...userDetails }
          : contact
      )
    );
    props.setVisible(false);
  };

  return (
    <div
      className="modal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="modal-card">
        <h2>Edit Contact</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <span>
            <b>Name</b>
          </span>
          <input
            name="name"
            type="text"
            /* placeholder={props.contacts[props.currentContactIndex].name} */
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
            /* placeholder={props.contacts[props.currentContactIndex].phoneNumber} */
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
            /* placeholder={props.contacts[props.currentContactIndex].email} */
            value={email}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <Button style={{ width: "8em" }}>Confirm Edit</Button>
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

export default EditContactModal;
