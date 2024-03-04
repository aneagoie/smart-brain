import React, { useState } from "react";

const Profile = ({ closeModal, user, onProfileUpdate }) => {
	const [formData, setFormData] = useState({
		name: user.name,
		age: user.age || "",
		pet: user.pet || "",
	});

	return (
		<div>
			<article className="w-100">
				<main className="pa4 black-80">
					<h1>{user.name}</h1>
					<h4>{user.entries}</h4>
					<p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
					<hr />
					<label
						className="mt2 fw6"
						htmlFor="user-name"
					>
						Name:
					</label>
					<input
						className="pa2 input-reset ba bg-transparent w-100"
						placeholder={user.name}
						type="text"
						name="user-name"
						id="user-name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
					<label
						className="mt2 fw6"
						htmlFor="user-age"
					>
						Age:
					</label>
					<input
						className="pa2 input-reset ba bg-transparent w-100"
						placeholder={user.age}
						type="text"
						name="user-age"
						id="user-age"
						value={formData.age}
						onChange={(e) => setFormData({ ...formData, age: e.target.value })}
					/>
					<label
						className="mt2 fw6"
						htmlFor="user-pet"
					>
						Pet:
					</label>
					<input
						className="pa2 input-reset ba bg-transparent w-100"
						placeholder={user.pet}
						type="text"
						name="user-pet"
						id="user-pet"
						value={formData.pet}
						onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
					/>
					<div
						className="mt4"
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<button
							className="modal-button"
							onClick={() => onProfileUpdate(formData)}
						>
							Save
						</button>
						<button
							className="modal-button"
							style={{ background: "red" }}
							onClick={closeModal}
						>
							Cancel
						</button>
					</div>
				</main>
			</article>
		</div>
	);
};

export default Profile;
