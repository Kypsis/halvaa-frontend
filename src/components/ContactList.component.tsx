import React from "react";

import ContactItem from "./ContactItem.component";

interface Props {}

const ContactList: React.FC<Props> = () => {
  return (
    <div>
      <h2>Contact List</h2>
      <ContactItem />
    </div>
  );
};

export default ContactList;
