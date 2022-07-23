import { useState } from "react";
import Layout from "./../../components/Layout/index";
import { Form, Button, Container } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../slices/authSlice";
import axiosIntance from "../../helpers/axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const userLogin = async (e) => {
    e.preventDefault();
    const tookUser = { email, password };

    dispatch(loginRequest(tookUser));
    try {
      const { data } = await axiosIntance.post("/admin/signin", tookUser);

      const { token, user } = data;

      localStorage.setItem("token", token);
      dispatch(loginSuccess({ token, user }));
    } catch (error) {
      dispatch(loginFailure(error.data));
    }
  };
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

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default Signin;
