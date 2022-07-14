import { Alert } from "react-bootstrap";
import Layout from "./../../components/Layout/index";
const Home = () => {
  return (
    <Layout>
      <Alert variant="secondary" className="text-center">
        <h1>Welcome to admin dashboard</h1>
      </Alert>
    </Layout>
  );
};

export default Home;
