import React from 'react';
import './profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return (
  <div className="profile-modal">
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
      <main className="pa4 black-80 w-80">
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="h3 w3 dib" alt="avatar" />
        <h1>User Name</h1>
        <h4>Images Submitted</h4>
        <p>Member since: </p>
        <hr />
        <label className="mt2 fw6" htmlFor="username">Name:</label>
        <input
          className="pa2 ba w-100"
          placeholder={'Username'}
          type="text"
          name="username"
          id="name"
        />
        <label className="mt2 fw6" htmlFor="age">Age:</label>
        <input
          className="pa2 ba w-100"
          placeholder={'56'}
          type="text"
          name="age"
          id="age"
        />
        <label className="mt2 fw6" htmlFor="pet">Pet:</label>
        <input
          className="pa2 ba w-100"
          placeholder={'dragon'}
          type="text"
          name="pet"
          id="pet"
        />        
        <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
          <button 
            className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
            onClick={toggleModal}
          >
            Save
          </button>
          <button 
            className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
            onClick={toggleModal}
          >
            Cancel
          </button>
        </div>
      </main>
      <div className="modal-close" onClick={toggleModal}>&times;</div>
    </article>
  </div>
  )
}

export default Profile;