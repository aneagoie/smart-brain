import { useEffect, useState } from "react";
import "./Modal.css";
import Profile from "../Profile/Profile";

const Modal = ({ showModal, setShowModal, user, loadUser }) => {
	const [isVisible, setIsVisible] = useState(false);

	const closeModal = () => {
		setIsVisible(false);
		setTimeout(() => {
			setShowModal(false);
		}, 300);
	};

	useEffect(() => {
		if (showModal) {
			setIsVisible(true);
		}
	}, [showModal]);

	const onProfileUpdate = (data) => {
		fetch(`http://localhost:3000/profile/${user.id}`, {
			method: "post",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${window.localStorage.getItem("token")}` },
			body: JSON.stringify({
				formInput: data,
			}),
		})
			.then((res) => {
				if (res.status === 200 || res.status === 304) {
					loadUser({ ...user, ...data });
				}
				closeModal();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div
				className={isVisible ? "overlay active" : "overlay"}
				onClick={closeModal}
			></div>
			<div className={isVisible ? "modal-wrapper active" : "modal-wrapper"}>
				<div>
					<Profile
						closeModal={closeModal}
						user={user}
						onProfileUpdate={onProfileUpdate}
					/>
				</div>
			</div>
		</>
	);
};

export default Modal;
