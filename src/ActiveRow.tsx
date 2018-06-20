import React = require("react");
import { View, ViewStyle } from "react-native";

import { ILayout } from "./util/ILayout";
import styles from "./util/styles";

interface IState {
	layout?: ILayout;
	location?: ILocation;
	row?: React.ReactNode;
}

interface ILocation {
	x: number;
	y: number;
}

const locationToStyle = (location: ILocation): ViewStyle => ({top: location.y, left: location.x});

export = class ActiveRow extends React.Component<{}, IState> {
	public state: IState = {
		row: null,
	};

	public render() {
		const { row, layout, location } = this.state;

		return row as boolean
			? <View style={[
				styles.activeRow,
				layout,
				locationToStyle(location as ILocation),
			]}>
				{row}
			</View>
			: null;
	}

	public setRow(row: React.ReactNode | null, layout?: ILayout, location?: ILocation) {
		this.setState({row, layout, location});
	}
};
