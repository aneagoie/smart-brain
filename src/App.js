import React, { Component } from "react";
// import Particles from 'react-particles-js';
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const initialState = {
	input: "",
	imageUrl: "",
	boxes: [],
	route: "signin", //temporary, previously = signin
	isSignedIn: false, //temporary, previously = false
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
		pet: "",
		age: "",
	},
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	calculateFaceLocations = (data) => {
		if (data && data.outputs) {
			return data.outputs[0].data.regions.map((face) => {
				const singleFace = face.region_info.bounding_box;
				const image = document.getElementById("inputimage");
				const width = Number(image.width);
				const height = Number(image.height);
				return {
					leftCol: singleFace.left_col * width,
					topRow: singleFace.top_row * height,
					rightCol: width - singleFace.right_col * width,
					bottomRow: height - singleFace.bottom_row * height,
				};
			});
		}
		return;
	};

	displayFaceBox = (boxes) => {
		if (boxes) {
			this.setState({ boxes: boxes });
		}
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });
		fetch("http://localhost:3000/imageurl", {
			method: "post",
			headers: { "Content-Type": "application/json", Authorization: "Bearer " + window.localStorage.getItem("token") },
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					fetch("http://localhost:3000/image", {
						method: "put",
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + window.localStorage.getItem("token"),
						},
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(console.log);
				}
				this.displayFaceBox(this.calculateFaceLocations(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === "signout") {
			return this.setState(initialState);
		} else if (route === "home") {
			this.setState({ isSignedIn: true });
		}
		this.setState({ route: route });
	};

	render() {
		const { isSignedIn, imageUrl, route, boxes, user } = this.state;
		return (
			<div className="App">
				<ParticlesBg
					type="circle"
					bg={true}
				/>
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
					user={user}
					loadUser={this.loadUser}
				/>
				{route === "home" ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition
							boxes={boxes}
							imageUrl={imageUrl}
						/>
					</div>
				) : route === "signin" ? (
					<Signin
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				) : (
					<Register
						loadUser={this.loadUser}
						onRouteChange={this.onRouteChange}
					/>
				)}
			</div>
		);
	}
}

export default App;
