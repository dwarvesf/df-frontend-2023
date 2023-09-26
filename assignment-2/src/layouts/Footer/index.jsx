import React from "react";
import { useStore } from "../../store";

const Footer = () => {
  const { state } = useStore();

  return (
    <div
      className={`container--footer ${
        state.isLight ? "color-light" : "color-dark"
      }`}
    >
      <ul>
        <li>Thủ Đức, Thành phố Hồ Chí Minh</li>
        <li>Bình Dương, Thành phố Bình Dương</li>
      </ul>
    </div>
  );
};

export default Footer;
