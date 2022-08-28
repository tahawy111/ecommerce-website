import React from "react";
import "./style.css";
const Card = (props) => {
  return (
    <div className="card" {...props}>
      <div className="cardHeader">
        {props.header_left && props.header_left}
        {props.header_right && props.header_right}
      </div>
      {props.children}
    </div>
  );
};

export default Card;
