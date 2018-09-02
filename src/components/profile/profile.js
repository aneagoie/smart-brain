import React from 'react';
import './profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return (
  <div className="profile-modal">
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
      <main className="pa4 black-80 w-80">
      <button onClick={toggleModal}>Close</button>
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="h3 w3 dib" alt="avatar" />
        <h1>User Name</h1>
        <h4>Images Submitted</h4>
        <p>Member since: </p>
        <hr />
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="text"
          name="name"
          id="name"
          onChange={this.onNameChange}
        />
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input
          className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="email"
          name="email-address"
          id="email-address"
          onChange={this.onEmailChange}
        />
        <input
          className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="password"
          name="password"
          id="password"
          onChange={this.onPasswordChange}
        />
      </main>
    </article>
  </div>
  )
}

export default Profile;