import React, { useState, useEffect } from "react";

import Button from "../Button/Button.component";
import { ContactList } from "../Contacts/Contacts.component";

import { editDbContact } from "../../utlities/contactsDbActions";
import "./EditContactModal.styles.css";

interface Props {
  currentContactIndex: number;
  contacts: ContactList;
  setContacts: React.Dispatch<React.SetStateAction<any>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditContacteditmodal: React.FC<Props> = props => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phonenumber: "",
    email: ""
  });

  const { name, phonenumber, email } = userDetails;

  useEffect(() => {
    setUserDetails({
      name: props?.contacts[props.currentContactIndex]?.name ?? "",
      phonenumber:
        props?.contacts[props.currentContactIndex]?.phonenumber ?? "",
      email: props?.contacts[props.currentContactIndex]?.email ?? ""
    });
  }, [props, props.contacts]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    editDbContact(
      props?.contacts[props.currentContactIndex]?.id,
      userDetails,
      props.setContacts
    );

    props.setVisible(false);
  };

  return (
    <div
      className="editmodal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="editmodal-card">
        <h2>Edit Contact</h2>
        <form className="editmodal-form" onSubmit={handleSubmit}>
          <span>
            <b>Name</b>
          </span>
          <input
            name="name"
            type="text"
            /* placeholder={props.contacts[props.currentContactId].name} */
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
            /* placeholder={props.contacts[props.currentContactId].phonenumber} */
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
            /* placeholder={props.contacts[props.currentContactId].email} */
            value={email}
            onChange={handleChange}
            required
          />
          <div className="editmodal-buttons">
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

export default EditContacteditmodal;
