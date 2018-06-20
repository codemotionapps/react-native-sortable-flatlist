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

export default class SortableList extends React.Component<ISortableListProps> {
	private readonly layouts: {[key: string]: ILayout} = {};
	private readonly rowRefs: {[key: string]: React.RefObject<View>} = {};

	public render() {
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

		const { key } = info.item;
		context.setActiveRow(
			renderItem(info),
			this.layouts[key],
			this.rowRefs[key].current as View,
		);
	}

	private renderItem(info: ListRenderItemInfo<IItem>) {
		const ref: React.RefObject<View> = (
			this.rowRefs[info.item.key] || (this.rowRefs[info.item.key] = React.createRef<View>())
		);

		const handleLongPress = () => {
			this.handleLongPress(info);
		};

		const handleLayout = (event: LayoutChangeEvent) => {
			this.handleLayout(info, event);
		};

		return <TouchableHighlight onLongPress={handleLongPress}>
			<View onLayout={handleLayout} ref={ref}>
				{this.props.renderItem(info)}
			</View>
		</TouchableHighlight>;
	}
}
