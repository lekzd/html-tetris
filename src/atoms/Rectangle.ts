import React from "react";
import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

interface IProps {
  fill: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const TYPE = "Rectangle";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(instance: PIXI.Graphics, oldProps: IProps, newProps: IProps) {
    const { fill, x, y, width, height } = newProps;
    instance.clear();
    instance.beginFill(fill);
    instance.drawRect(x, y, width, height);
    instance.endFill();
  }
};
export const Rectangle: React.FC<IProps> = CustomPIXIComponent(behavior, TYPE) as any;
