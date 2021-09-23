import React from "react";
import "../App.css";
// import Home from "../assets/home.png";
// import Explore from "../assets/explore.png";
// import Chat from "../assets/chat.png";
// import Tender from "../assets/tender.png";
// import Auction from "../assets/auction.png";
const MenuItem = (props) => {
  return (
    <li>
      <a href={props.to} className="menu-item">
        <div className="menu-icon">
          <img src={require(`../assets${props.to.toLowerCase()}.png`)} />
        </div>
        <span> {props.name} </span>
      </a>
    </li>
  );
};

export default MenuItem;
