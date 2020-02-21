import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import AddContactModal from "../AddContactModal/AddContactModal.component";
import EditContactModal from "../EditContactModal/EditContactModal.component";
import Button from "../Button/Button.component";
import ContactsItem from "../ContactsItem/ContactsItem.component";

import {
  getAllDbContacts,
  deleteDbContact
} from "../../utlities/contactsDbActions";
import "./Contacts.styles.css";

export type ContactList = {
  id: number;
  name: string;
  phonenumber: string;
  email: string;
}[];

interface Props {}

const Contacts: React.FC<Props> = () => {
  const [contacts, setContacts] = useState<ContactList | []>([]);
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);
  const [editContactModalVisible, setEditContactModalVisible] = useState(false);

  useEffect(() => {
    getAllDbContacts(setContacts);
  }, []);

  // Store contacts in localstorage everytime contacts state changes
  useEffect(() => {
    /* localStorage.setItem("contacts", JSON.stringify(contacts));  */
    console.log(contacts);
  }, [contacts]);

  const reorder = (list: ContactList, startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedContacts = reorder(
      contacts,
      result.source.index,
      result.destination.index
    );

    setContacts([...reorderedContacts]);
  };

  const deleteContact = (contactIndex: number): void => {
    deleteDbContact(contacts[contactIndex].id, setContacts);
  };

  // Optimization so all children of <Droppable /> wouldn't rerender when drag ends.
  const ContactList = React.memo(function ContactList(props: {
    contacts: any;
  }) {
    return props.contacts.map((contact: any, index: number) => (
      <ContactsItem
        id={contact.id}
        index={index}
        key={contact.name + index}
        deleteContact={deleteContact}
        setCurrentContactIndex={setCurrentContactIndex}
        setEditContactModalVisible={setEditContactModalVisible}
        {...contact}
      />
    ));
  });

  return (
    <div className="contacts-container">
      <AddContactModal
        currentContactIndex={currentContactIndex}
        setContacts={setContacts}
        visible={addContactModalVisible}
        setVisible={setAddContactModalVisible}
      />
      <EditContactModal
        currentContactIndex={currentContactIndex}
        contacts={contacts}
        setContacts={setContacts}
        visible={editContactModalVisible}
        setVisible={setEditContactModalVisible}
      />
      <div className="contacts-header">
        <h2>{contacts.length || ""} Contacts</h2>
        <Button
          style={{ width: "8em", height: "2.5em" }}
          onClick={() => setAddContactModalVisible(true)}
        >
          Add Contact
        </Button>
      </div>
      <div className="contacts-titles">
        <b>Name</b>
        <b>Phone Number</b>
        <b>Email</b>
        <b>Actions</b>
      </div>
      <div className="contacts-list">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ContactList contacts={contacts} />

                {/* This is used to create space in the <Droppable /> as needed during a drag. */}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Contacts;
