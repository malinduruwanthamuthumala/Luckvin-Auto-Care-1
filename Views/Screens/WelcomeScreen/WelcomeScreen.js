import React, { Component } from 'react'
import {
	StyleSheet,
	Text, View, TextInput, TouchableHighlight, Image, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity
} from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { fb } from '../../../firebaseConfig/config';

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			fname:'',
			lname:'',
			contact: '',
			password: '',
			password_c:'',
			user: null,
			page: ''
		};
		this.ref = fb.firestore().collection('Users');
		// this.signoutUser();

		// this.signoutUser(); 
	}

	addUser() {
		this.ref.add({
			email: this.state.user.email
		});
	}

	//add users to collection

	//event listner for login button click
	onClickListener = (email, pw) => {
		this.loginUser(email, pw)
	}

	// user login
	loginUser = async (email, pw) => {
		if (email != '' && pw != '') {
			try {
				let user = fb.auth().signInWithEmailAndPassword(email, pw);
				console.log(user);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('Missing email or password');
		}
	}

	//user signout
	signoutUser = () => {
		fb.auth().signOut().then(() => {
			console.log('Logged out');
		}).catch(err => {
			console.log('Error', err);
		});
	}


	//sign up using email and password 
	async signup(email, pass) {
		try {
			await fb.auth().createUserWithEmailAndPassword(email, pass).then(data => {
				this.ref.doc(data.user.uid).set({
					email: data.user.email,
					fname: this.state.fname,
					lname: this.state.lname,
					contact: this.state.contact,
					password: this.state.password
				});
				// console.log(data.user.uid);
			});
			console.log("Account created");
		} catch (error) {
			console.log(error.toString())
		}
	}

	//fb login
	// async loginWithFb() {
	// 	const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
	// 		'307070559996016',
	// 		{ permissions: ['email', 'public_profile'] } 
	// 	);

	// 	if (type === 'success') {
	// 		const credentials = fb.auth.FacebookAuthProvider.credential(token);
	// 		fb.auth().signInAndRetrieveDataWithCredential(credentials).catch(err => {
	// 			console.log("Error", err);
	// 		});
	// 	}
	// }


	render() {
		if (this.state.page == '') {
			return (
				<ImageBackground source={require('../../Images/login3.jpg')} resizeMode='cover' style={styles.container}>
					<KeyboardAvoidingView style={{ flex: 1, width:"100%"}}>
						{/* <View style={{ marginTop: 70, flex: 1 }}> */}
							<ScrollView style={{paddingTop: 20, flex: 1 }}>
								{/* <Text style={{ fontSize: 30, color: 'white', fontWeight: '300', marginBottom: 30, textAlign:'center' }}>Log In</Text> */}
								<View style={{alignItems:'center'}}>
									<Image source={require('../../Images/tick.png')} style={{height:200, width:200}}/>
								</View>
								<View style={{ marginBottom: 10, marginTop:30, flexDirection:'row'}}>
									{/* <Text style={{ color: 'white' }}>EMAIL ADDRESS</Text> */}
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='envelope-o'
  										color='white' />
									<TextInput 
										keyboardType='email-address'
										placeholder="Email" 
										placeholderTextColor="#bab8b8" 
										style={ styles.textInputs } 
										onChangeText={(email) => {this.setState({email})}}
									/>
								</View>

								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='eye'
  										color='white' />
									{/* <Text style={{ color: 'white' }}>PASSWORD</Text> */}
									<TextInput 
										secureTextEntry={true}
										placeholder="Password" 
										placeholderTextColor="#bab8b8" 
										style={styles.textInputs} 
										onChangeText={(password) => {this.setState({password})}}/>
								</View>

								<TouchableOpacity style={{
									marginTop: 10,
									marginHorizontal: 40,
									paddingVertical: 15,
									borderRadius: 2,
									// borderColor:'5e5d5d',
									backgroundColor: '#ed256d',
									fontSize: 20,
									flexDirection:'row'
								}}
									onPress={() => this.loginUser(this.state.email, this.state.password)}>
									<Icon name="sign-in" color="white" style={{marginLeft:100}} size={27}/>
									<Text style={{textAlign:'center', color:"white", marginTop:3, marginLeft:5}}>LOGIN</Text>
								</TouchableOpacity>

								<TouchableOpacity style={{marginTop:40, marginBottom:30}} onPress={() => this.setState({
									page: "register",
									email: '',
									password: ''
								})}>
									<Text style={{textAlign:'center', color:'#bab8b8', }}>Click here to Register</Text>
								</TouchableOpacity>
							</ScrollView>
						{/* </View> */}
					</KeyboardAvoidingView>
				</ImageBackground>
			)
		} else if (this.state.page == "register") {
			return (
				<ImageBackground source={require('../../Images/login3.jpg')} resizeMode='cover' style={styles.container}>
					<KeyboardAvoidingView style={{ flex: 1, width:"100%"}}>
						<View style={{ marginTop: 0, flex: 1 }}>
							<TouchableHighlight
								onPress={()=>this.setState({
									page: '',
									email: '',
									fname:'',
									lname:'',
									contact: '',
									password: '',
									password_c:'',
								})}
							>
								<Icon
									name="arrow-left"
									color="white"
									size={27}
									style={{
										marginLeft:30,
										marginTop:20,
										paddingBottom:5,
										backgroundColor:'transparent'
									}}
								/>
							</TouchableHighlight>
							<ScrollView style={{paddingTop: 40, flex: 1}}>
								<Text style={{ fontSize: 30, color: 'white', fontWeight: '300', marginBottom: 30 }}>New Account</Text>
								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='envelope-o'
  										color='white' />
									<TextInput 
										keyboardType='email-address'
										placeholder = "Emali"
										placeholderTextColor = "#bab8b8"
										style={styles.textInputs}  
										onChangeText={(email) => {this.setState({email})}}
									/>
								</View>
								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='user'
  										color='white' />
									<TextInput
										placeholder = "First Name"
										placeholderTextColor = "#bab8b8" 
										style={styles.textInputs} 
										onChangeText={(fname) => {this.setState({fname})}}
									/>
								</View>
								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='user'
  										color='white' />
									<TextInput
										placeholder = "Last Name"
										placeholderTextColor = "#bab8b8" 
										style={styles.textInputs} 
										onChangeText={(lname) => {this.setState({lname})}}
									/>
								</View>
								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='phone'
  										color='white' />
									<TextInput
										keyboardType='phone-pad'
										placeholder = "Contact Number"
										placeholderTextColor = "#bab8b8" 
										style={styles.textInputs} 
										onChangeText={(contact) => {this.setState({contact})}}
									/>
								</View>

								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='eye'
  										color='white' />
									<TextInput 
										secureTextEntry={true}
										placeholder = "Password"
										placeholderTextColor = "#bab8b8"
										style={styles.textInputs} 
										onChangeText={(password) => {this.setState({password})}}
									/>
								</View>
								
								<View style={{ marginBottom: 20, flexDirection:'row' }}>
									<Icon
										size = {20}
										style={{paddingTop:20, paddingLeft:10, paddingRight:10}}
  										name='eye'
  										color='white' />
									<TextInput 
										secureTextEntry={true}
										placeholder = "Confirm Password"
										placeholderTextColor = "#bab8b8"
										style={styles.textInputs} 
										onChangeText={(password_c) => {this.setState({password_c})}}
									/>
								</View>

								<TouchableOpacity style={{
									marginTop: 10,
									marginHorizontal: 40,
									paddingVertical: 15,
									borderRadius: 2,
									// borderColor:'5e5d5d',
									backgroundColor: '#ed256d',
									fontSize: 20,
									marginBottom:60
								}}
									onPress={() => this.signup(this.state.email, this.state.password)}>
									<Text style={{textAlign:'center', color:'white'}}>REGISTER</Text>
								</TouchableOpacity>
							</ScrollView>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			)
		}
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'column',
		tintColor: 'hsla(360, 100%, 100%, 1.0)'
		// opacity: 0.1

	},
	inputContainer: {
		borderBottomColor: '#f7073f',
		// backgroundColor: '#FFFFFF',
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: '#FFFFFF',
		flex: 1,
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: 'center'
	},
	buttonContainer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
	},
	loginButton: {
		backgroundColor: "#d12963",
	},
	loginText: {
		color: 'white',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'stretch',
	},
	textInputs:{
		borderBottomColor: '#5e5d5d', 
		borderBottomWidth:1, 
		color: 'white', 
		width:"100%", fontSize:18
	}
});

export default WelcomeScreen;