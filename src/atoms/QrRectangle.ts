import React from "react";
import { CustomPIXIComponent } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import qrEncoder from "qr-encoder";

interface IProps {
  string: string;
  fill: number;
  stroke: number;
  x: number;
  y: number;
  size: number;
}

const TYPE = "QrRectangle";
export const behavior = {
  customDisplayObject: () => new PIXI.Graphics(),
  customApplyProps: function(instance: PIXI.Graphics, oldProps: IProps, newProps: IProps) {
    const { fill, stroke, x, y, size, string } = newProps;
    const bitMatrix = qrEncoder.encode(string, 1);
    const tileSize = size / (bitMatrix.length + 2);

    instance.clear();

    instance.beginFill(fill);
    instance.drawRect(x, y, size, size);
    instance.endFill();

    instance.beginFill(stroke);

    bitMatrix.forEach((row, tileY) => {
      row
        .forEach((isStroke, tileX) => {
          const left = x + (tileX * tileSize) + tileSize;
          const top = y + (tileY * tileSize) + tileSize;

          isStroke && instance.drawRect(left, top, tileSize, tileSize);
        });
    });

    instance.endFill();
  }
};
export const QrRectangle: React.FC<IProps> = CustomPIXIComponent(behavior, TYPE) as any;
