import React = require("react");
import { findNodeHandle, MeasureLayoutOnSuccessCallback, View } from "react-native";

import Context from "./util/context";
import { ILayout } from "./util/ILayout";
import noop from "./util/noop";
import styles from "./util/styles";

import ActiveRow = require("./ActiveRow");

export default class SortableContext extends React.Component {
	private readonly activeRowRef = React.createRef<ActiveRow>();
	private readonly env = {
		setActiveRow: this.setActiveRow.bind(this),
	};
	private readonly viewRef = React.createRef<View>();

	public render() {
		return <Context.Provider value={this.env}>
			<View ref={this.viewRef} style={styles.context}>
				{this.props.children}
				<ActiveRow ref={this.activeRowRef} />
			</View>
		</Context.Provider>;
	}

	private measure(view: View, onSuccess: MeasureLayoutOnSuccessCallback) {
		view.measureLayout(
			findNodeHandle(this.viewRef.current as View) as number,
			onSuccess,
			noop,
		);
	}

	private setActiveRow(row: React.ReactNode | null, layout?: ILayout, view?: View) {
		const activeRow = this.activeRowRef.current as ActiveRow;
		if (row) {
			this.measure(view as View, (x, y) => {
				activeRow.setRow(row, layout, {x, y});
			});
		} else {
			activeRow.setRow(null);
		}
	}
}
