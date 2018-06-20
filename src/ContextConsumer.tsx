import React = require("react");

import Context from "./util/context";
import { ISortableListPropsWithoutContext } from "./util/ISortableListProps";

import SortableList from "./SortableList";

// tslint:disable-next-line only-arrow-functions
export default function ContextConsumer(props: ISortableListPropsWithoutContext) {
	return <Context.Consumer>
		{(context) => {
			if (context === null) {
				throw new Error("SortableList must be a child of SortableContext");
			}

			return <SortableList
				{...props}
				context={context}
			/>;
		}}
	</Context.Consumer>;
}
