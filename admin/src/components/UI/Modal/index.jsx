import React from "react";
import { Button, Modal } from "react-bootstrap";

const NewModal = (props) => {
  return (
    <div>
      <Modal size={props.size} show={props.show} onHide={props.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {props.submitTitle && (
            <Button variant="primary" onClick={props.handleClose}>
              {props.submitTitle}
            </Button>
          )}

          {!props.submitTitle &&
            props.buttons &&
            props.buttons.map((btn, index) => (
              <Button key={index} variant={btn.color} onClick={btn.onClick}>
                {btn.label}
              </Button>
            ))}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewModal;
