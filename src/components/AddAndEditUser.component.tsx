import React, { useState } from "react";

import Button from "./Button.component";

import "./AddAndEditUser.styles.css";

interface Props {
  /* addUser(): any; */
  contacts: any;
  setContacts: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}

const ConfirmDeleteModal: React.FC<Props> = props => {
  const [userCredentials, setCredentials] = useState({
    name: "",
    phoneNumber: "",
    email: ""
  });

  const { name, phoneNumber, email } = userCredentials;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    console.log(userCredentials);
    props.setContacts([...props.contacts, { ...userCredentials }]);
    props.setVisible(false);
  };

  return (
    <div
      className="modal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="modal-card">
        <h3>Add User</h3>
        <form className="signin-form" onSubmit={handleSubmit}>
          <span>Name</span>
          <input
            name="name"
            type="text"
            /* placeholder={t("forms.enterEmail")} */
            value={name}
            onChange={handleChange}
            required
          />
          <span>Phone Number</span>
          <input
            name="phoneNumber"
            type="number"
            /* placeholder={t("forms.enterPassword")} */
            value={phoneNumber}
            pattern="[0-9]*"
            onChange={handleChange}
            required
          />
          <span>Email</span>
          <input
            name="email"
            type="email"
            /* placeholder={t("forms.enterPassword")} */
            value={email}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <Button style={{ width: "6em" }}>Add User</Button>
            <Button
              style={{ width: "6em" }}
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

export default ConfirmDeleteModal;
