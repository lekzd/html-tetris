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

const TYPE = "Beak";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(instance: PIXI.Graphics, oldProps: IProps, newProps: IProps) {
    const { fill, x, y, width, height } = newProps;
    instance.clear();
    instance.beginFill(fill);

    instance.drawPolygon([
      0, 0,
      width - 5, 0,
      width + 5, height >> 1,
      width - 5, height,
      0, height,
    ]);

    instance.endFill();
  }
};
export const Beak: React.FC<IProps> = CustomPIXIComponent(behavior, TYPE) as any;
