import React from "react";
import {COLOR_STYLES} from "../colorStyles";

export type IStyle = {
  name: string;
  [key: number]: number;
}

export const StyleContext = React.createContext<IStyle>(COLOR_STYLES.Monokai);
