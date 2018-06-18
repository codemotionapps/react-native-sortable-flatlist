import React = require("react");
import { ListRenderItemInfo, StyleSheet, Text, View } from "react-native";

import { SortableContext, SortableList } from "../../src/index";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#000",
		flex: 1,
		justifyContent: "center",
		padding: 40,
	},
	item: {
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 5,
		flex: 1,
		justifyContent: "center",
		margin: 5,
		padding: 5,
	},
	list: {
		backgroundColor: "#303030",
		width: 250,
	},
	listsContainer: {
		backgroundColor: "#191919",
	},
});

interface IItem {
	height: number;
	id: string;
	key: string;
}

const renderItem = (
	{item: {height, id}}: ListRenderItemInfo<IItem>,
	// {onLayout}: {onLayout(event: LayoutChangeEvent): void},
) =>
	<View style={[styles.item, {height}]}>
		<Text>Item {id}</Text>
	</View>;

const data: IItem[] = [];

// tslint:disable-next-line no-magic-numbers
for (let i = 0; i < 200; i++) {
	// tslint:disable-next-line no-magic-numbers
	const height = (Math.random() * 50) + 25;
	const iAsString = i.toString();
	data.push({
		height,
		id: iAsString,
		key: iAsString,
	});
}

export = class App extends React.Component {
	// tslint:disable-next-line
	public render() {
		return <View style={styles.container}>
			<SortableContext>
				<SortableList
					style={styles.list}
					data={data}
					renderItem={renderItem}
				/>
			</SortableContext>
		</View>;
	}
};
