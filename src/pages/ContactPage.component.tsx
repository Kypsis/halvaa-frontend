import React from "react";

import ContactList from "../components/ContactList.component";

import "./ContactPage.styles.css";

interface Props {}

const ContactPage: React.FC<Props> = () => {
  return (
    <div className="ContactPage">
      <h1>Contacts</h1>
      <ContactList />
    </div>
  );
};

export default ContactPage;
