import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar" />
            <h1>User Name</h1>
            <h4>Images Submitted: 5</h4>
            <p>Member since: January</p>
            <br />
              <label className="mt2 fw6" htmlFor="user-name">Name:</label>
              <input
                className="pa2 w-100"
                placeholder="User"
                type="text"
                name="user-name"
                id="name"
                onChange={this.onNameChange}
              />

              <label className="mt2 fw6" htmlFor="user-age">Age:</label>
              <input
                className="pa2 w-100"
                placeholder="Age"
                type="text"
                name="user-age"
                id="age"
                onChange={this.onNameChange}
              />

              <label className="mt2 fw6" htmlFor="user-pte">Pet:</label>
              <input
                className="pa2 w-100"
                placeholder="Pet"
                type="text"
                name="user-pet"
                id="age"
                onChange={this.onNameChange}
              />
              <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
                <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b-black-20">Save</button>
                <button
                  className="b pa2 grow pointer hover-white w-40 bg-light-red b-black-20"
                  onClick={toggleModal}
                  >Cancel</button>
              </div>
        </main>
        <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
    </div>
  );
}

export default Profile;
