import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggle = () => {
    setDropDownOpen(!dropDownOpen);
  };
  return (
    <div className="pa4 tc">
      <Dropdown isOpen={dropDownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropDownOpen}
        >
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 h3 w3 dib"
            alt="avatar"
          />
        </DropdownToggle>
        <DropdownMenu
          className="b--transparent shadow-5"
          style={{ marginTop: 20, backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange("signout")}>
            Sign Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
