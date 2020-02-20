import React from "react";

import "./Button.styles.css";

interface Props {
  onClick?(arg?: any): any;
  style?: object;
}

const Button: React.FC<Props> = props => {
  return (
    <button
      className="button-custombutton"
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
