import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Avatar } from 'react-native-elements';

import Location from './MainWindows/Location/Location';
import Vehicles from './MainWindows/Vehicles/Vehicles';
import Profile from './MainWindows/Profile/Profile';
 
const CustomDrawerComponent = (props) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ height: "20%", backgroundColor: 'white', justifyContent: 'center', alignItems: "center" }}>
				<Avatar
					size="large"
					rounded
					// onPress={() => this.editAvatar()}
					source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
				// showEditButton
				/>
				<Text>
					Ayesh
				</Text>
			</View>
			<ScrollView contentContainerStyle={styles.contentContainer}>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	);
}

const TabNavigator = createDrawerNavigator(
	{
		Vehicles: {
			screen: Vehicles
		},
		Profile: {
			screen: Profile
		},
		Location: {
			screen: Location
		},
	},
	{
		contentComponent: CustomDrawerComponent
	}

);

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor:'white'
	}
});

export default class Drawer extends React.Component {
	render() {
		return <AppContainer />;
	}
}

