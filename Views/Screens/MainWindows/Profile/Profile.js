import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TouchableHighlight } from 'react-native'
// import { ImagePicker } from 'react-native-image-picker'
import { Avatar } from 'react-native-elements';
import { fb, database } from '../../../../firebaseConfig/config'
import Icon from 'react-native-vector-icons/Octicons'
import WelcomeScreen from '../../WelcomeScreen/WelcomeScreen'

var ImagePicker = require('react-native-image-picker');


const options = {
	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};
export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: null,
			user: null,
			avatar: null
		}

	}

	componentDidMount() {
		if (!this.state.user) {
			fb.auth().onAuthStateChanged((user) => {
				if (user) {
					this.setState({
						user
					});
					database.collection('Users').doc(this.state.user.uid).get().then(user => {
						this.setState({
							userData: user.data(),
							avatar : user.data().photoURL
						});
					})
					// console.log(user);
				} else {
					console.log("Eror")
				}
			})
		}
	}

	editAvatar = () => {
		ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
			if (res.didCancel) {
				console.log("User cancelled!");
			} else if (res.error) {
				console.log("Error", res.error);
			} else {
				this.uploadAvatar(res).then(() => {
					alert("Success");
				}).catch((error) => {
					alert(error);
				})
				// this.setState({
				// 	avatar: res
				// 	// avatar: { uri: res.uri }
				// });
				// console.log(this.state.avatar);
			}
		});
	}

	uploadAvatar = async (res) => {
		// console.log(res);
		const response = await fetch(res.uri)
		console.log(response)
		// const blob = await response.blob();
		// var ref = fb.storage().ref().child("Users/" + res.fileName);
		// return ref.put(blob);
	}

	logOut = () => {
		fb.auth().signOut().then(() => {
			console.log('Logged out');
			return (
				<WelcomeScreen />
			);
		}).catch(err => {
			console.log('Error', err);
		});
	}

	ccc = () => {
		console.log(this.state.avatar)
	}

	render() {
		// const {user} = this.state.user;
		return (
			<View style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
				<View style={{ flexDirection: 'row', marginTop:8 }}>
					<View style={{marginBottom:10}}>
						<TouchableHighlight onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="white"
								size={27}
								style={{marginLeft: 10,marginTop: 10,paddingBottom: 5,backgroundColor: 'transparent'}}
							/>
						</TouchableHighlight>
					</View>
					<View style={{ marginLeft: "30%", marginTop: 5 }}>
						<Text style={{ color: 'white', fontSize: 26 }}>Profile</Text>
					</View>
					<View style={{marginBottom:10}}>
						<TouchableHighlight onPress={() => this.logOut()} >
							<Icon
								name="sign-out"
								color="red"
								size={27}
								style={{
									marginLeft: 110,
									marginTop: 10,
									paddingBottom: 5,
									backgroundColor: 'transparent'
								}}
							/>
						</TouchableHighlight>
					</View>
				</View>

				<View
					style={{justifyContent: 'space-evenly',alignItems: 'center',flexDirection: 'row',paddingVertical: 10}}>
					{/* <TouchableOpacity onPress={() => this.editAvatar()}>
						<Image
							source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
							style={{
								marginLeft: 10, width: 100, height: 100, borderRadius: 50
							}}
						/>
					</TouchableOpacity> */}
					<Avatar
						size="large"
						rounded
						onPress={() => this.editAvatar()}
						source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
						showEditButton
					/>
					<View
						style={{
							marginRight: 10
						}}
					>
						{this.state.userData ? (
							<View>
								<Text style={styles.profileInfo}>{this.state.userData.fname + " " + this.state.userData.lname}</Text>
								<Text style={styles.profileInfo}>{this.state.userData.email}</Text>
								{/* <Text>Username</Text> */}
							</View>
						) : (
								<View style={{flex: 1,justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-around',padding: 10}}>
									<ActivityIndicator size="small" color="#00ff00" />
								</View>
							)}
					</View>
				</View>

				<View style={{ paddingBottom: 20, borderBottomWidth: 1 }}>
					<TouchableOpacity style={{marginTop: 10,marginHorizontal: 40,paddingVertical: 15,borderRadius: 20,backgroundColor: 'gray'}} onPress={this.ccc}>
						<Text style={{textAlign: 'center',color: 'white',fontSize: 17}}>
							Edit Profile
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity>
						<Text>Logout</Text>
					</TouchableOpacity> */}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	profileInfo:{
		fontSize: 15, 
		color:'white' 
	}
});