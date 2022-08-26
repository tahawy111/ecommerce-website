import { useEffect, useState } from "react";
import "./style.css";
import flipkart from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";

import { FaSearch } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiFillStar, AiOutlinePoweroff } from "react-icons/ai";
import Dropdown from "../Dropdown";
import { useRef } from "react";
import { MaterialButton, MaterialInput, Modal } from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { logout, userLogin as login } from "./../../actions/auth.actions";
import { BsGiftFill, BsListStars, BsTrophyFill } from "react-icons/bs";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    });
  });

  const userLogin = () => {
    dispatch(login({ email, password })).then(() => {
      setLoginModal(false);
    });
  };

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
                style={{ marginTop: "50px", marginRight: "15px" }}
                type="text"
                label="Enter Email/Enter Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MaterialInput
                style={{ marginRight: "15px" }}
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={
                  <a href="/" style={{ color: "#2874f0", fontWeight: 700 }}>
                    Forgot?
                  </a>
                }
              />
              <MaterialButton
                style={{ marginTop: "15px" }}
                title="Login"
                bgcolor="#fb641b"
                textcolor="#ffffff"
                onClick={userLogin}
              />
              <p style={{ color: "#878787" }}>OR</p>
              <MaterialButton
                style={{ marginTop: "15px" }}
                title="Request OTP"
                bgcolor="#fff"
                textcolor="#2874f0"
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
          {!auth.authenticate && (
            <button className="btn" onClick={() => setLoginModal(true)}>
              Login
            </button>
          )}
          <a href="/">Become a Seller</a>

          {auth.authenticate && (
            <Dropdown
              className="ml-5"
              show={showAccountMenu.toString()}
              maintitle={auth.user.fullName}
              menuref={menuRef}
              onClick={() =>
                showAccountMenu
                  ? setShowAccountMenu(false)
                  : setShowAccountMenu(true)
              }
              menu={[
                {
                  title: `My Profile`,
                  href: "/",
                  icon: <CgProfile color="#2874f0" />,
                },
                {
                  title: "Flipkart Plus Zone",
                  href: "/",
                  icon: <AiFillStar color="#2874f0" />,
                },
                {
                  title: "Orders",
                  href: "/",
                  icon: <AiFillStar color="#2874f0" />,
                },
                {
                  title: "Wishlist",
                  href: "/",
                  icon: <BsListStars color="#2874f0" />,
                },
                { title: "Rewards", icon: <BsTrophyFill color="#2874f0" /> },
                {
                  title: "Gift Cards",
                  href: "/",
                  icon: <BsGiftFill color="#2874f0" />,
                },
                {
                  title: "Logout",
                  href: "/",
                  onClick: () => {
                    dispatch(logout());
                  },
                  icon: <AiOutlinePoweroff color="#2874f0" />,
                },
              ]}
            />
          )}

          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <IoMdCart size={23} />
            <span style={{ fontSize: 17, marginLeft: 5 }}>Cart</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
