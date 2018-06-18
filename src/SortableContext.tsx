import React = require("react");

import Context from "./util/context";

import ActiveRow = require("./ActiveRow");

export = class SortableContext extends React.Component {
	private readonly activeRowRef = React.createRef<ActiveRow>();
	private readonly env = {
		setActiveRow: this.setActiveRow.bind(this),
	};

	public render() {
		return <Context.Provider value={this.env}>
			{this.props.children}
			<ActiveRow ref={this.activeRowRef} />
		</Context.Provider>;
	}

	private setActiveRow(row, layout) {
		(this.activeRowRef.current as ActiveRow).setRow(row, layout);
	}
};
