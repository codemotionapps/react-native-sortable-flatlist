import React = require("react");
import { View } from "react-native";

import { ILayout } from "./ILayout";

export interface IContext {
	setActiveRow(row: React.ReactNode | null, layout?: ILayout, viewRef?: View): void;
}

export default React.createContext<IContext | null>(null);
