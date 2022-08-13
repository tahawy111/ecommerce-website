import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import axiosIntance from "./../../helpers/axios";
import { FaSignOutAlt } from "react-icons/fa";
const {
  logoutSuccess,
  logoutRequest,
  loginFailure,
} = require("../../slices/authSlice");

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const logout = async () => {
    const res = await axiosIntance.post("/admin/signout");

    dispatch(logoutRequest());
    if (res.status === 200) {
      localStorage.clear();
      dispatch(logoutSuccess());
    } else {
      dispatch(loginFailure({ error: res.data.error }));
    }
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <span
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          <FaSignOutAlt className="fs-4" />
        </span>
      </Nav>
    );
  };
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <NavLink to="/signin" className="nav-link">
          Signin
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          Signup
        </NavLink>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <Link className="navbar-brand" to="/">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
