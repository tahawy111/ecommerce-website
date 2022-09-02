import "./style.css";
import { BsChevronDown } from "react-icons/bs";
const Dropdown = (props) => {
  const { show, maintitle, menu, menuref } = props;
  return (
    <span {...props} ref={menuref}>
      <li
        className="mainTitle"
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <BsChevronDown style={{ marginRight: "3px", fontSize: "18px" }} />
        {maintitle}
      </li>
      <div
        style={{
          display: show === "true" ? "block" : "none",
        }}
      >
        {menu.map((menu, index) => {
          const onClick = (e) => {
            if (menu.onClick) {
              e.preventDefault();
              menu.onClick && menu.onClick();
            }
          };
          return (
            <li
              key={index}
              style={{
                borderBottom: "1px solid #cacaca",
              }}
            >
              <a
                href={menu.href}
                onClick={menu.onClick && onClick}
                style={{
                  pointerEvents: menu.href ? "auto" : "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px",
                  gap: "0 10px",
                }}
              >
                {menu.icon} {menu.title}
              </a>
            </li>
          );
        })}
      </div>
    </span>
  );
};

export default Dropdown;
