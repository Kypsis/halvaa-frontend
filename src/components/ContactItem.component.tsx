import React from "react";

import "./ContactItem.styles.css";

interface Props {
  name: string;
  phoneNumber: string;
  email: string;
}

const ContactItem: React.FC<Props> = ({ name, phoneNumber, email }) => {
  return (
    <div className="contactitem-container">
      <div>{name}</div>
      <div>{phoneNumber}</div>
      <div>{email}</div>
    </div>
  );
};

export default ContactItem;
