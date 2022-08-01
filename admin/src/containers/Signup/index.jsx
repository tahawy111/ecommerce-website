import Layout from "./../../components/Layout/index";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import {
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../../slices/userSlice";
import axiosIntance from "./../../helpers/axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const userSignup = async (e) => {
    e.preventDefault();
    const tookUser = { firstName, lastName, email, password };
    dispatch(registerRequest(tookUser));

    try {
      const { data } = await axiosIntance.post("/admin/signup", tookUser);
      dispatch(registerSuccess({ data }));
    } catch (error) {
      console.log(error);
      dispatch(
        registerFailure({ error: error.response.data.message || error.message })
      );
    }
  };

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  if (user.loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <Layout>
      <Container style={{ maxWidth: 700 }} className="mt-5">
        {user.message && (
          <Alert variant="warning" dismissible>
            {user.message}
          </Alert>
        )}
        <Form onSubmit={userSignup}>
          <Row>
            <Col md={6}>
              <Input
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
          </Row>

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Row>
            <Col md={6}>
              <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Signup;
