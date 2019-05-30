import {Subject} from "rxjs";
import {INode} from "./INode";
import {IAttributes} from "./IAttributes";
import {DomDrawer} from "./DomDrawer";
import {HEIGHT} from "../constants";

export class Dom extends Subject<string[]> {

  affectedLines$ = new Subject<number[]>();

  private renderedLines: string[] = [];
  private data = new Array<INode>();
  private attributes = new WeakMap<INode, IAttributes>();
  private drawer = new DomDrawer(this.data, this.attributes);

  private topOffset = 0;
  private leftOffset = 0;

  private createNode(name: string, parent?: INode): INode {
    const newNode = {
      name,
      isCollapsed: false,
      parent,
    };

    this.attributes.set(newNode, new Map<string, string>());

    return newNode;
  }

  private renderTree() {
    this.renderedLines = this.drawer.getRenderedStrings();
    this.leftOffset = 3;
    this.topOffset = (HEIGHT - this.renderedLines.length) >> 1;

    this.next(this.renderedLines);
  }

  unshiftNode(name: string, parent?: INode) {
    const newNode = this.createNode(name, parent);

    this.data.unshift(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  pushNode(name: string, parent?: INode) {
    const newNode = this.createNode(name, parent);

    this.data.push(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  addAttribute(name: string, node: INode) {
    const attributes = this.attributes.get(node);

    if (!attributes) {
      return;
    }

    attributes.set(name, '');
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(node));
  }

  getNodeByPosition(x: number, y: number): INode | null {
    const rendered = this.renderedLines[y - this.topOffset];

    if (!rendered) {
      return null;
    }

    const start = rendered.indexOf('<') + this.leftOffset;
    const end = rendered.indexOf('>') + this.leftOffset;

    if (x < start || x > end) {
      return null;
    }

    return this.drawer.getNodeByPosition(x - this.leftOffset, y - this.topOffset);
  }
}
