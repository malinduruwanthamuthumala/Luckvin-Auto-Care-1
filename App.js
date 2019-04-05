import React from 'react';
import { Text, View, YellowBox  } from 'react-native';
import { fb } from './firebaseConfig/config';

import WelcomeScreen from './Views/Screens/WelcomeScreen/WelcomeScreen';
import Drawer from './Views/Screens/Drawer';

class App extends React.Component {
	constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer']);
		this.state = {
			//make this signup state false after editing profile.js
			signupState: false,
			email: '',
			password: '',
			user: null
		};



		// this.ref = fb.firestore().collection('Users');

		// console.log(this.ref.doc.data());
	}

	componentDidMount() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				// console.log(user);
				this.setState({
					user,
					signupState: true
				});
				// console.log(this.ref.doc.id);
			} else {
				this.setState({
					signupState: false
				});
			}
		}.bind(this));
	}

	render() {
		if (!this.state.signupState) {
			return (
				<View style={{ flex: 1 }}>
					{/* <Profile/> */}
					{/* <Vehicles/> */}
					<WelcomeScreen />
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1 }}>
					{/* <KeepAwake></KeepAwake> */}
					{/* <Text style={{color: "red"}}>dhfhgcgcghchgsdf</Text> */}
					{/* <Navigation /> */}
					<Drawer />
				</View>
			);
		}
	}
}


export default App;