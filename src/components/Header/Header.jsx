import "./Header.css";
import {
  FaBell,
  FaBullhorn,
  FaGift,
  FaUser,
  FaComments,
  FaKeyboard,
  FaSyncAlt
} from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-container">

      {/* TOP ROW */}
      <div className="header">
        <h2>Dashboard</h2>

        <div className="header-right">
          <FaBell className="icon" />
          <FaBullhorn className="icon" />
          <FaGift className="icon" />
          <FaUser className="icon" />
          <FaComments className="icon" />
          <FaKeyboard className="icon" />

          <button className="demo-btn">Book Demo</button>
        </div>
      </div>

      {/* RIGHT SIDE UPDATE */}
      <div className="update-right">
        <span>
          Last Update: <b>31 Mar 2026 | 04:42 PM</b>
        </span>
        <FaSyncAlt className="refresh" />
      </div>

    </div>
  );
};

export default Header;