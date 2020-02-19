import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ContactItem from "./ContactItem.component";

import "./Contacts.styles.css";

const placeholderContacts = [
  { name: "Joe Banana", phoneNumber: "12345678", email: "test1@test.io" },
  { name: "Tom Apple", phoneNumber: "87654321", email: "test2@test.io" },
  { name: "Mike Melon", phoneNumber: "24688642", email: "test3@test.io" },
  { name: "Bob Kiwi", phoneNumber: "13577531", email: "test4@test.io" }
];

type ContactList = {
  name: string;
  phoneNumber: string;
  email: string;
}[];

interface Props {}

const Contacts: React.FC<Props> = () => {
  const initialState: ContactList =
    JSON.parse(localStorage.getItem("contacts")!) || placeholderContacts;

  const [contacts, setContacts] = useState(initialState);

  useEffect(() => {
    console.log(contacts);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const reorder = (list: ContactList, startIndex: number, endIndex: number) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="contacts-container"
          >
            <h2>Contacts</h2>
            {contacts.map((contact, index) => (
              <ContactItem key={contact.name} {...contact} index={index} />
            ))}

            {/* This is used to create space in the <Droppable /> as needed during a drag */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Contacts;
