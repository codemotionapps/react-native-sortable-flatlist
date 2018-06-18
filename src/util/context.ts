import React = require("react");

import { ILayout } from "./ILayout";

export interface IContext {
	setActiveRow(row?: React.ReactNode, layout?: ILayout): void;
}

export default React.createContext<IContext | null>(null);
