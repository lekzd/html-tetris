import {Subject} from "rxjs";
import {Node} from "../nodes/Node";
import {DomDrawer} from "./DomDrawer";
import {HEIGHT} from "../constants";
import {nodeTypes} from "../nodes/nodeTypes";

export class Dom extends Subject<string[]> {

  affectedLines$ = new Subject<number[]>();

  private renderedLines: string[] = [];
  private data = new Array<Node>();
  private drawer = new DomDrawer(this.data);

  private topOffset = 0;
  private leftOffset = 0;

  private createNode(name: string, parent?: Node): Node {
    if (!nodeTypes[name]) {
      throw Error(`No node by name "${name}"`);
    }

    const NodeConstructor = nodeTypes[name];
    const newNode = new NodeConstructor(this, name, parent);

    newNode.onCreate();

    if (parent) {
      parent.addChild(newNode);
    }

    return newNode;
  }

  private renderTree() {
    this.renderedLines = this.drawer.getRenderedStrings();
    this.leftOffset = 3;
    this.topOffset = (HEIGHT - this.renderedLines.length) >> 1;

    this.next(this.renderedLines);
  }

  unshiftNode(name: string, parent?: Node) {
    const newNode = this.createNode(name, parent);

    this.data.unshift(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  pushNode(name: string, parent?: Node) {
    const newNode = this.createNode(name, parent);

    this.data.push(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  addAttribute(name: string, node: Node) {
    node.addAttribute(name);

    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(node));
  }

  getNodeByPosition(x: number, y: number): Node | null {
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
