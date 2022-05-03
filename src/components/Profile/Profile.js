import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ isProfileOpen, toggleModal, user, loadUser }) => {
  const [formValues, setFormValues] = useState({
    name: user.name,
    age: user.age,
    pet: user.pet,
  });

  const onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        setFormValues({ ...formValues, name: event.target.value });
        break;
      case "user-age":
        setFormValues({ ...formValues, age: event.target.value });
        break;
      case "user-pet":
        setFormValues({ ...formValues, pet: event.target.value });
        break;
    }
  };

  const onProfileUpdate = (data) => {
    const token = window.sessionStorage.getItem("token");
    fetch(`http://localhost:3000/profile/${user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        formInput: formValues,
      }),
    })
      .then((resp) => {
        if ([200, 304].includes(resp.status)) {
          toggleModal();
          loadUser({ ...user, ...data });
        }
      })
      .catch(console.log);
  };

  return (
    <div className="profile-modal">
      <article
        className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white"
        style={{ position: "relative" }}
      >
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h1>{formValues.name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member Since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" htmlFor="user-name">
            Name:
          </label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.name}
            type="text"
            name="user-name"
            id="name"
            // onChange={this.onNameChange}
          />

          <label className="mt2 fw6" htmlFor="user-age">
            Age:
          </label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.age}
            type="text"
            name="user-age"
            id="age"
            // onChange={this.onNameChange}
          />

          <label className="mt2 fw6" htmlFor="user-pet">
            Pet:
          </label>
          <input
            onChange={onFormChange}
            className="pa2 ba w-100"
            placeholder={user.pet}
            type="text"
            name="user-pet"
            id="pet"
            // onChange={this.onNameChange}
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button
              onClick={() => onProfileUpdate(formValues)}
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
            >
              Save
            </button>
            <button
              onClick={toggleModal}
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
