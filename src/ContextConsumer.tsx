import React = require("react");

import Context from "./util/context";
import { ISortableListPropsWithoutContext } from "./util/ISortableListProps";

import SortableList = require("./SortableList");

// tslint:disable-next-line only-arrow-functions
export = class ContextConsumer extends React.Component<ISortableListPropsWithoutContext> {
	public render() {
		return <Context.Consumer>
			{(context) => {
				if (context === null) {
					throw new Error("SortableList must be a child of SortableContext");
				}

				return <SortableList
					{...this.props}
					context={context}
				/>;
			}}
		</Context.Consumer>;
	}
};
