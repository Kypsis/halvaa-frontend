import React, { useState } from "react";

import Button from "../Button/Button.component";

import "./AddAndEditUser.styles.css";

interface Props {
  /* addUser(): any; */
  contacts: any;
  setContacts: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}

const ConfirmDeleteModal: React.FC<Props> = props => {
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

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    props.setContacts([...props.contacts, { ...userDetails }]);
    props.setVisible(false);
  };

  return (
    <div
      className="modal-container"
      style={{ visibility: props.visible ? "visible" : "hidden" }}
    >
      <div className="modal-card">
        <h2>Add User</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <span>
            <b>Name</b>
          </span>
          <input
            name="name"
            type="text"
            /* placeholder={t("forms.enterEmail")} */
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
            /* placeholder={t("forms.enterPassword")} */
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
