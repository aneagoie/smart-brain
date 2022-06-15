import react from "react";
import './Profile.css'

const Profile = ({isProfileOpen, toggleModal}) => {
    return (
    <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">

        <main className="pa4 black-80">
            <img
                src="http://tachyons.io/img/logo.jpg"
            className="br-100 ba h3 w3 dib" alt="avatar" />
            <h1>Jessie Doe</h1>
            <h4>Images Submitted: 5</h4>
            <p>Member since : Januari
            </p>
            <label>Name: </label>
            <input
            className="pa2 ba w-100"
            placeholder="Jessie"
            name="username"
            id="name"
            />
            <label>Age: </label>
            <input
            className="pa2 ba w-100"
            placeholder="56"
            name="age"
            id="age"
            />
            <label>Pet: </label>
            <input
            className="pa2 ba w-100"
            placeholder="Dragon"
            name="username-pet"
            id="pet"
            />
                
            <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}}> 
                <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20' onClick={toggleModal}> Start</button>
                <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20' onClick={toggleModal}> Cancel</button>
            </div>    
         </main>
         <div className="modal-close" onClick={toggleModal}>&times;</div>
      </article>
       
    </div>)
}

export default Profile;