import React = require("react");
import { ListRenderItemInfo, ScrollView, StyleSheet, Text, View } from "react-native";

import { SortableContext, SortableList } from "../../src/index";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#000",
		flex: 1,
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
		backgroundColor: "#818181",
		margin: 5,
		width: 250,
	},
	listsContainer: {
		backgroundColor: "#4c4c4c",
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

const data: IItem[][] = [];

// tslint:disable-next-line no-magic-numbers
for (let i = 0; i < 10; i++) {
	const currentList: IItem[] = [];
	data.push(currentList);
	// tslint:disable-next-line no-magic-numbers
	for (let j = 0; j < 200; j++) {
		// tslint:disable-next-line no-magic-numbers
		const height = (Math.random() * 50) + 25;
		const iAsString = j.toString();
		currentList.push({
			height,
			id: iAsString,
			key: iAsString,
		});
	}
}

export = class App extends React.Component {
	// tslint:disable-next-line
	public render() {
		return <View style={styles.container}>
			<SortableContext>
				<ScrollView horizontal style={styles.listsContainer}>
					{data.map((list, index) =>
						<SortableList
							key={index}
							style={styles.list}
							data={list}
							renderItem={renderItem}
						/>,
					)}
				</ScrollView>
			</SortableContext>
		</View>;
	}
};
