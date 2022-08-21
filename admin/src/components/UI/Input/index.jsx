import { Form } from "react-bootstrap";
const Input = (props) => {
  let input = null;
  if (props.type !== "select") {
    input = (
      <Form.Group className="mb-3">
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <Form.Control
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
        <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
      </Form.Group>
    );
  }
  if (props.type === "select") {
    input = (
      <>
        {props.label && <Form.Label>{props.label}</Form.Label>}
        <select
          className="form-control mb-3"
          value={props.value}
          onChange={props.onChange}
        >
          <option value="">{props.label}</option>

          {props.options.length > 0
            ? props.options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))
            : null}
        </select>
      </>
    );
  }

  return input;
};

export default Input;
