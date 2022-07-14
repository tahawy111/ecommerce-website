import Layout from "./../../components/Layout/index";
import { Form, Button, Container } from "react-bootstrap";
import Input from "../../components/UI/Input";
const Signin = () => {
  return (
    <Layout>
      <Container style={{ maxWidth: 700 }} className="mt-5">
        <Form>
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
