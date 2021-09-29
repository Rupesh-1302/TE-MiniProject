import React, { useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.jpg";
import home from "../assets/home.png";
import explore from "../assets/explore.png";
import chat from "../assets/chat.png";
import tender from "../assets/tender.png";
import auction from "../assets/auction.png";
import { Link, useRouteMatch } from "react-router-dom";
import "../stylesheets/sideNav.css";

export const menuItems = [
  {
    name: "Home",
    exact: true,
    to: "/home",
    srcPath: "../assets/home.png",
  },
  { name: "Explore", to: `/explore`, srcPath: "../assets/explore.png" },
  { name: "Chat", to: `/chat`, srcPath: "../assets/chat.png" },
  { name: "Tender", to: `/tender`, srcPath: "../assets/tender.png" },
  { name: "Auction", to: `/auction`, srcPath: "../assets/auction.png" },
];

function SideMenu() {
  const [inactive, setInactive] = useState(false);
  const { url } = useRouteMatch();
  return (
    <div
      className={`side-menu ${
        inactive ? "inactive" : ""
      } bg-light navbar-light`}
    >
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="sidebar-logo" />
        </div>
        <div
          onClick={() => {
            setInactive(!inactive);
          }}
          className="toggle-menu-btn"
        >
          {inactive ? (
            <i className="bi bi-arrow-bar-right"></i>
          ) : (
            <i className="bi bi-arrow-bar-left"></i>
          )}
        </div>
      </div>

      <div className="main-menu">
        <ul>
          <li className="my-4">
            <Link to={`${url}/home`} className="menu-item ">
              <div className="menu-icon">
                <img src={home} title="Home" alt="Home-icon" />
              </div>
              <span> Home </span>
            </Link>
          </li>
          <li className="my-4">
            <Link to={`${url}/explore`} className="menu-item">
              <div className="menu-icon">
                <img src={explore} alt="Home-icon" />
              </div>
              <span> Explore </span>
            </Link>
          </li>

          <li className="my-4">
            <Link to={`${url}/chat`} className="menu-item">
              <div className="menu-icon">
                <img src={chat} alt="Home-icon" />
              </div>
              <span>Chat</span>
            </Link>
          </li>
          <li className="my-4">
            <Link to={`${url}/tender`} className="menu-item">
              <div className="menu-icon">
                <img src={tender} alt="Home-icon" />
              </div>
              <span>Tender</span>
            </Link>
          </li>
          <li className="my-4">
            <Link to={`${url}/auction`} className="menu-item">
              <div className="menu-icon">
                <img src={auction} alt="Home-icon" />
              </div>
              <span>Auction</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="" />
        </div>
        <div className="user-info">
          <h5>Mahesh Gajakosh</h5>
          <p>maheshgajakosh1@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
