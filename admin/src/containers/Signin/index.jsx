import { useState } from "react";
import Layout from "./../../components/Layout/index";
import { Form, Button, Container } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { userLogin as login } from "../../actions/auth.actions";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = async (e) => {
    e.preventDefault();
    const tookUser = { email, password };
    dispatch(login(tookUser));
  };

  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Container style={{ maxWidth: 600 }} className="mt-5">
        <Form onSubmit={userLogin}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {auth.authenticating && <h4 className="my-3">Loading...</h4>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Signin;
