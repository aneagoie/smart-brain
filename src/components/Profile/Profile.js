import react from "react";
import './Profile.css'

class  Profile extends react.Component  {
    constructor(props) {
        super(props);
        this.state ={
            name: this.props.user.name,
            age: this.props.user.age,
            pet: this.props.user.pet
        }

    }

    onFormChange = (event) => {
        switch(event.target.name){
            case 'user-name':
                this.setState({name: event.target.value})
                break;
            case 'user-age':
                this.setState({age: event.target.value})
                break;
            case 'user-pet':
                this.setState({pet: event.target.value})
                break;
            default:
                return;
        }
    }

    onProfileUpdate = (data) => {
        fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({formInput: data})
        }).then(resp => {
            this.props.toggleModal();
            this.props.loadUser({...this.props.user, ...data});

        }).catch(console.log)
    }

    render() {
        const {user} = this.props;
        const {name, age, pet} = this.state;
        return (
            <div className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
        
                <main className="pa4 black-80">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                    className="br-100 ba h3 w3 dib" alt="avatar" />
                    <h1>{this.state.name}</h1>
                    <h4>{`Images Submitted: ${user.entries} `}</h4>
                    <p>{`Member since : ${new Date(user.joined).toLocaleDateString()}`}
                    </p>
                    <label>Name: </label>
                    <input
                    onChange={this.onFormChange}
                    className="pa2 ba w-100"
                    placeholder={user.name}
                    name="user-name"
                    id="name"
                    />
                    <label>Age: </label>
                    <input
                    onChange={this.onFormChange}
                    className="pa2 ba w-100"
                    placeholder={user.age}
                    name="user-age"
                    id="age"
                    />
                    <label>Pet: </label>
                    <input
                    onChange={this.onFormChange}
                    className="pa2 ba w-100"
                    placeholder={user.pet}
                    name="user-pet"
                    id="pet"
                    />
                        
                    <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}}> 
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20' onClick={() => this.onProfileUpdate({name, age, pet})} > Save</button>
                        <button className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20' onClick={this.props.toggleModal}> Cancel</button>
                    </div>    
                 </main>
                 <div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
              </article>
               
            </div>)
    }
    
}

export default Profile;