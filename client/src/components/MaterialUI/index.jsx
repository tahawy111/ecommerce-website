import React, { useState } from "react";
import "./style.css";
import { GrClose } from "react-icons/gr";

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalClose" onClick={props.onClose}>
            <GrClose color={props.iconcolor} />
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className="materialInput"
      style={{ marginBottom: "15px", ...props.style }}
    >
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            }
          }}
        />
        <span className="right-element">
          {props.rightElement ? props.rightElement : null}
        </span>
      </div>
    </div>
  );
};

const MaterialButton = (props) => {
  const onClick = () => {
    props.onClick && props.onClick();
  };
  return (
    <div {...props} style={{ width: "90%", ...props.style }}>
      <button
        className="materialButton"
        style={{
          backgroundColor: props.bgcolor,
          color: props.textcolor,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={onClick}
      >
        <span style={{ marginRight: "10px" }}>{props.icon && props.icon}</span>
        <span>{props.title && props.title}</span>
      </button>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton };
