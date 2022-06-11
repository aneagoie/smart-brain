import react from "react";
import './Profile.css'

const Profile = ({isProfileOpen, toggleModal}) => {
    return (
    <div className="br3 ba b-black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2">
        <button onClick={toggleModal}> Click</button>
    </div>)
}

export default Profile;