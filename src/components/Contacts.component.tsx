import React, { useState, useEffect } from "react";

import ContactItem from "./ContactItem.component";

import "./Contacts.styles.css";

const placeholderContacts = [
  { name: "Joe Banana", phoneNumber: "12345678", email: "test1@test.io" },
  { name: "Tom Apple", phoneNumber: "87654321", email: "test2@test.io" },
  { name: "Mike Melon", phoneNumber: "24688642", email: "test3@test.io" },
  { name: "Bob Kiwi", phoneNumber: "13577531", email: "test4@test.io" }
];

interface Props {}

const Contacts: React.FC<Props> = () => {
  const [contacts, setContacts] = useState(placeholderContacts);

  return (
    <div className="contacts-container">
      <h2>Contacts</h2>
      {contacts.map(contact => (
        <ContactItem key={contact.name} {...contact} />
      ))}
    </div>
  );
};

export default Contacts;
