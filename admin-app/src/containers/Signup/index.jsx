import Layout from "./../../components/Layout/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
const Signup = () => {
  return (
    <Layout>
      <Container style={{ maxWidth: 700 }} className="mt-5">
        <Form>
          <Row>
            <Col md={6}>
              <Input
                label="First Name"
                type="text"
                placeholder="Enter First Name"
              />
            </Col>
            <Col md={6}>
              <Input
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
              />
            </Col>
          </Row>

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

export default Signup;
