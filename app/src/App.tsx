import React = require("react");
import { StyleSheet, View } from "react-native";

import ReactNativeSortableFlatList = require("../../src/index");
import C1 = ReactNativeSortableFlatList.C1;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#fff",
		flex: 1,
		justifyContent: "center",
	},
});

export = class App extends React.Component {
	// tslint:disable-next-line
	public render() {
		return (
			<View style={styles.container}>
				<C1 />
			</View>
		);
	}
};
