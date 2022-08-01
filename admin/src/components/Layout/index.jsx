import Header from "../Header";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col sm={2} md={2} className="sidebar" style={{ paddingRight: 0 }}>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
              <NavLink to="/products" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/orders" className="nav-link">
                Orders
              </NavLink>
            </Col>
            <Col sm={8} md={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
