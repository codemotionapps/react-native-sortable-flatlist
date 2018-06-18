import React = require("react");
import {
	FlatList,
	LayoutChangeEvent,
	ListRenderItemInfo,
	TouchableHighlight,
	View,
} from "react-native";

import { ILayout } from "./util/ILayout";
import { IItem, ISortableListProps } from "./util/ISortableListProps";
// Import noop = require("./util/noop");

export = class SortableList extends React.Component<ISortableListProps> {
	private readonly layouts: {[key: string]: ILayout} = {};

	public render() {
		// tslint:disable-next-line
		console.log(this.props.context);
		const props = {
			...this.props,
			renderItem: this.renderItem.bind(this),
		};
		delete props.context;

		return <FlatList {...props}/>;
	}

	private handleLayout(
		{item}: ListRenderItemInfo<IItem>,
		{nativeEvent: {layout: {width, height}}}: LayoutChangeEvent,
	) {
		this.layouts[item.key] = {width, height};
	}

	private handleLongPress(info: ListRenderItemInfo<IItem>) {
		const { context, renderItem } = this.props;

		context.setActiveRow(renderItem(info), this.layouts[info.item.key]);
	}

	private renderItem(info) {
		return <TouchableHighlight onLongPress={this.handleLongPress.bind(this, info)}>
			<View onLayout={this.handleLayout.bind(this, info)}>
				{this.props.renderItem(info)}
			</View>
		</TouchableHighlight>;
	}
};
