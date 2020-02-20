import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "./ContactsItem.styles.css";

interface Props {
  name: string;
  phoneNumber: string;
  email: string;
  index: number;
}

const ContactItem: React.FC<Props> = ({ name, phoneNumber, email, index }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="contactitem-container"
        >
          <div>
            <b>{name}</b>
          </div>
          <div>{phoneNumber}</div>
          <div>{email}</div>
        </div>
      )}
    </Draggable>
  );
};

export default ContactItem;
