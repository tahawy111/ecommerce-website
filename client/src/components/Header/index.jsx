import { useEffect, useState } from "react";
import "./style.css";
import flipkart from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";

import { FaSearch } from "react-icons/fa";
import Dropdown from "../Dropdown";
import loginImage from "../../images/login-image.png";
import { useRef } from "react";
import { MaterialButton, MaterialInput, Modal } from "../MaterialUI";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    });
  });
  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <MaterialInput
                style={{ marginTop: "50px" }}
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={<a href="#">Forgot?</a>}
              />
              <MaterialButton
                style={{ marginTop: "15px" }}
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
              />
              <p style={{ color: "#878787" }}>OR</p>
              <MaterialButton
                style={{ marginTop: "15px" }}
                title="Request OTP"
                bgColor="#fff"
                textColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="container">
        <div className="left">
          <img src={flipkart} alt="" className="logo" />
          <div className="more-details-logo">
            <span>
              Explore <span>Plus</span>
            </span>
            <img src={goldenStar} alt="" className="logo" />
          </div>
        </div>
        <div className="center">
          <input
            className="input"
            type="text"
            placeholder="Search for products, brands and more"
          />
          <span className="search-icon">
            <FaSearch />
          </span>
        </div>
        <div className="right">
          <button className="btn" onClick={() => setLoginModal(true)}>
            Login
          </button>
          <a href="/">Become a Seller</a>
          <Dropdown
            className="ml-5"
            show={showAccountMenu.toString()}
            maintitle="My Account"
            menuref={menuRef}
            onClick={() =>
              showAccountMenu
                ? setShowAccountMenu(false)
                : setShowAccountMenu(true)
            }
            menu={[
              { title: "My Profile", href: "/" },
              { title: "Flipkart Plus Zone", href: "/" },
              { title: "Orders", href: "/" },
              { title: "Wishlist", href: "/" },
              { title: "Rewards" },
              { title: "Gift Cards", href: "/" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
