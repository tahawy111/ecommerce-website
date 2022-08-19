import Layout from "./../../components/Layout/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
import { toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const userSignup = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not matches!");
    // }
    // if (!confirmPassword) {
    //   toast.error("Please Confirm Password");
    // }

    const tookUser = { firstName, lastName, email, password };
    dispatch(registerRequest(tookUser));

    try {
      const { data } = await axiosIntance.post("/admin/signup", tookUser);
      dispatch(registerSuccess({ data }));
    } catch (error) {
      dispatch(registerFailure({ error }));
      toast.error(error.data.error);
    }
  };

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Container style={{ maxWidth: 700 }} className="mt-5">
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
            {user.loading && <h5 className="mb-3">Loading...</h5>}
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
