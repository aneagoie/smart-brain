import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Upload from './components/Upload/Upload';
import Image from './components/Image/Image';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Choice from './components/Choice/Choice';

import './App.css';

const clarifai = new Clarifai.App({
  apiKey: 'd7945fe573cd4ee99bc0e166d68ae7ff'
 });

// background graphics of application
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  choice: null,
  imageUrl: null,
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // accepts input then be declared on app state
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  CapturePhoto = async (image) => {
    let prototypeUrl;

    // const prototypeUrl;
    if(this.state.choice === "upload" && (image[0].type === "image/jpg" || image[0].type === "image/png")){
      prototypeUrl = (image[0].base64).slice(22);
    }else if (this.state.choice === "upload"){
      prototypeUrl = (image[0].base64).slice(23);
    } else {
      prototypeUrl = image.slice(23);
    }

    await this.setState({imageUrl: prototypeUrl});
    this.onButtonSubmit();
  }



  // submit the image from input state (URL)
  // submit button when logged in (POST)
  // add 1 to rank of user profile (PUT)
  onButtonSubmit = () => {   
    clarifai.models.predict(Clarifai.FOOD_MODEL, {base64: this.state.imageUrl})
    .then((data) => {
      console.log(data);
    })
    .catch(err => console.log(err));
  } 

  // route management
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  //Change the choice of image upload or take picture
  onChoiceChange = (buttonchoice) => {
    this.setState({choice: buttonchoice});
  }

  render() {
    const { isSignedIn, imageUrl, route, choice } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              {
                choice === 'picture'
                  ? <Image CapturePhoto={this.CapturePhoto} onChoiceChange={this.onChoiceChange}></Image>  
                  : choice === 'upload'
                    ? <Upload CapturePhoto={this.CapturePhoto} onChoiceChange={this.onChoiceChange}></Upload>
                    : <Choice onChoiceChange={this.onChoiceChange}></Choice>
              }
                       
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
