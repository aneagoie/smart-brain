import React, { useState } from "react";
import noAvatar from "../../assets/noAvatar.png";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";

const ProfileIcon = ({ onRouteChange, user, loadUser }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);

	const [showModal, setShowModal] = useState(false);

	return (
		<div className="pa4 tc">
			<Dropdown
				isOpen={dropdownOpen}
				toggle={toggle}
				direction={"down"}
			>
				<DropdownToggle
					data-toggle="dropdown"
					tag="span"
				>
					<img
						src={noAvatar}
						className="br-100 h3 w3 dib"
						alt="avatar"
					/>
				</DropdownToggle>
				<DropdownMenu
					className="b--transparent shadow-5"
					style={{ marginTop: "20px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}
				>
					<DropdownItem onClick={() => setShowModal(true)}>View Profile</DropdownItem>
					<DropdownItem onClick={() => onRouteChange("signout")}>Signout</DropdownItem>
				</DropdownMenu>
			</Dropdown>

			{showModal &&
				createPortal(
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						user={user}
						loadUser={loadUser}
					/>,
					document.body
				)}
		</div>
	);
};

export default ProfileIcon;
