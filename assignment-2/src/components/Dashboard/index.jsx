import React from "react";
import { useOutlet } from "react-router-dom";
//! Components
import Sidebar from "../../components/Sidebar";
//! Icons
import CreateBookIcon from "../Icons/CreateBookIcon";
import CreateTopicIcon from "../Icons/CreateTopicIcon";
import SettingIcon from "../Icons/SettingIcon";

const DashboardScreen = () => {
  const outlet = useOutlet();
  //! user or admin
  const navItems = [
    { key: "/", icon: <CreateBookIcon />, title: "Create Book" },
    { key: "/create-topic", icon: <CreateTopicIcon />, title: "Create Topic" },
    { key: "/setting", icon: <SettingIcon />, title: "Setting" },
  ];

  return (
    <div className="container--content">
      <Sidebar navItems={navItems} />
      <div className="container--fluid container-app">{outlet}</div>
    </div>
  );
};

export default DashboardScreen;
