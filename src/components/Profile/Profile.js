import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    };
  }

  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = data => {
    fetch(`http://localhost:3001/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput: data })
    }).then(resp => {
      if (resp.status === 200 || resp.status === 304) {
        console.log("SENT DATA: ", data);
        this.props.toggleModal();
        this.props.loadUser({ ...this.props.user, ...data });
      }
    }).catch(console.log('onProfileUpdate error'));
  }

  render() {
    const { toggleModal } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src={this.props.profileIconUrl}
              className="br-100 ba h3 w3 dib"
              alt="avatar"
            />
            <h1>{name}</h1>
            <h3>Age: {age}</h3>
            <h3>Pet: {pet}</h3>
            <h4>Images Submitted: 5</h4>
            <p>Member since: January</p>
            <hr />
            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="johnny"
              type="text"
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="23"
              type="text"
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label className="mt2 fw6" htmlFor="user-pet">
              Pet:
            </label>
            <input
              className="pa2 ba w-100"
              placeholder="dragon"
              type="text"
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
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
  }
}

export default Profile;
