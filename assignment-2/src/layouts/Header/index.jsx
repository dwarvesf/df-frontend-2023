import React from "react";
import { useStore } from "../../store";

const Header = () => {
  const { state } = useStore();

  return (
    <div className={`header ${state.isLight ? "color-light" : "color-dark"}`}>
      <h1 className="branch-name">Book Store</h1>
      <div className="avatar">
        <img src="./assets/images/avatar.jpg" alt="image-avatar" />
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};

export default Header;
