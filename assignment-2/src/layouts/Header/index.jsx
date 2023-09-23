import React from "react";

const Header = () => {
  return (
    <div className="header">
      <h1 className="branch-name">Book Store</h1>
      <div className="avatar">
        <img src="./assets/images/avatar.jpg" alt="image-avatar" />
        <span className="username">John Doe</span>
      </div>
    </div>
  );
};

export default Header;
