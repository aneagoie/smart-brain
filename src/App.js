import React, {Component} from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

const initialState = { 
  input:'',
  imageurl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: { 
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
   

class App extends React.Component {
  constructor() { 
    super();
    this.state= initialState
    }
  

  loadUser = (data) => {
    this.setState({
      user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      } 
    })
  }

  
  calculateFaceLocation = (data) => {
  
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    return { 
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width)  ,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => { 
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    
    this.setState({imageurl: this.state.input});
        fetch('https://backend-face-recog.onrender.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
            })
         })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://backend-face-recog.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => { 
      if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() { 
    const { isSignedIn, imageurl, route, box} = this.state;
      return (
        <div className="App">
          <ParticlesBg type="square" bg={true} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
          { route === 'home' 
          ? <div>
            <Logo />
            <Rank name= {this.state.user.name} entries={this.state.user.entries}/ >
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageurl={imageurl} />
          </div>
          : ( 
            route === 'Signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )          
          }
        </div>
      );
    }
  }

export default App;
