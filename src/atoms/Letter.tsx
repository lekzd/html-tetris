import React from "react";
import {Text, TextProperties} from 'react-pixi-fiber';

interface IProps extends Partial<TextProperties> {
  color: number;
}

const CENTER_ANCHOR = '0,0' as any;

export const Letter: React.FC<IProps> = props => (
  <Text
    {...props}
    anchor={CENTER_ANCHOR}
    style={{
      fill: props.color,
      fontFamily: 'monospace',
    }}
  />
);