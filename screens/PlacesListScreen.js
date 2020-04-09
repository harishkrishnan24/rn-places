import React from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";

const PlacesListScreen = (props) => {
	const places = useSelector((state) => state.places.places);
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<PlaceItem
					onSelect={() => {
						props.navigation.navigate("PlaceDetail", {
							placeTitle: itemData.item.title,
							placeId: itemData.item.id,
						});
					}}
					image={itemData.item.imageUri}
					title={itemData.item.title}
					address={null}
				/>
			)}
		/>
	);
};

PlacesListScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "All Places",
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Add Place'
					iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
					onPress={() => {
						navData.navigation.navigate("NewPlace");
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default PlacesListScreen;
