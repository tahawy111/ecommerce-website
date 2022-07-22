import Layout from "./../../components/Layout/index";
import { Form, Button, Container } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
const Signin = () => {
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const user = { email: "amer.vib@gmail.com", password: 123456 };
    dispatch(login(user));
  };
  return (
    <Layout>
      <Container style={{ maxWidth: 700 }} className="mt-5">
        <Form onSubmit={userLogin}>
          <Input label="Email Address" type="email" placeholder="Enter Email" />

          <Input
            label="Password"
            type="password"
            placeholder="Enter Password"
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
