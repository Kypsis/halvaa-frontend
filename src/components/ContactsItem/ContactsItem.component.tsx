import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import "./ContactsItem.styles.css";

interface Props {
  name: string;
  phoneNumber: string;
  email: string;
  index: number;
  deleteContact(contactIndex: number): void;
  setCurrentContactIndex(arg: number): void;
  setEditContactModalVisible(arg: boolean): void;
}

const ContactItem: React.FC<Props> = ({
  name,
  phoneNumber,
  email,
  index,
  deleteContact,
  setCurrentContactIndex,
  setEditContactModalVisible
}) => {
  const handleEdit = () => {
    setCurrentContactIndex(index);
    setEditContactModalVisible(true);
  };

  return (
    <Draggable draggableId={name + index} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="contactsitem-container"
        >
          <div>{name}</div>
          <div>{phoneNumber}</div>
          <div>{email}</div>
          <div className="contactsitem-icons">
            <FaEdit onClick={handleEdit} />
            <FaTrashAlt onClick={() => deleteContact(index)} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ContactItem;
