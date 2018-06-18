import React = require("react");
import { View } from "react-native";

import { ILayout } from "./util/ILayout";
import styles = require("./util/styles");

interface IState {
	layout?: ILayout;
	row?: React.ReactNode;
}

export = class ActiveRow extends React.Component<{}, IState> {
	public state: IState = {};

	public render() {
		const { row, layout } = this.state;

		return row as boolean
			? <View style={[styles.activeRow, layout]}>
				{row}
			</View>
			: null;
	}

	public setRow(row?: React.ReactNode, layout?: ILayout) {
		this.setState({row, layout});
	}
};
