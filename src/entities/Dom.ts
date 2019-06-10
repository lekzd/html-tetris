import {Subject} from "rxjs";
import {BaseNode} from "../nodes/Node";
import {DomDrawer} from "./DomDrawer";
import {gameScrollState$} from "../constants";
import {nodeTypes} from "../nodes/nodeTypes";
import {Stack} from '../utils/Stack';
import {materialMarkup$} from '../App';

export class Dom extends Subject<string[]> {

  affectedLines$ = new Subject<number[]>();
  renderedLines: string[] = [];

  private data: BaseNode[] = [];
  private drawer = new DomDrawer(this.data);

  private spacesCount: number = 2;

  private createNode(name: string, parent?: BaseNode): BaseNode {
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

    materialMarkup$.next(this.data.find(node => !node.parent));

    this.next(this.renderedLines);
  }

  get indexesStack(): Stack<number> {
    return this.drawer.indexesStack;
  }

  set spaces(value: number) {
    this.spacesCount = value;

    this.drawer.setSpaces(value);
  }

  get spaces(): number {
    return this.spacesCount;
  }

  unshiftNode(name: string, parent?: BaseNode) {
    const newNode = this.createNode(name, parent);

    this.data.unshift(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  private moveNode(targetNode: BaseNode, offset: number) {
    const {parent} = targetNode;
    if (!parent) {
      return;
    }

    const currentIndex = this.data.indexOf(targetNode);
    const newIndex = currentIndex + offset;

    this.data.splice(currentIndex, 1);

    const clonedArray = [...this.data];

    this.data.length = 0;

    this.data.push(...[
      ...clonedArray.slice(0, newIndex),
      targetNode,
      ...clonedArray.slice(newIndex),
    ]);

    parent.children = this.data.filter(child => child.parent === parent);

    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(targetNode));
  }

  moveNodeDown(targetNode: BaseNode) {
    const {parent} = targetNode;

    if (parent) {
      const children = this.data.filter(node => node.parent === parent);
      const currentIndex = children.indexOf(targetNode);

      if (currentIndex === children.length - 1) {
        // go after parent
      }

      if (currentIndex < children.length - 1) {
        // move down on current level
        this.moveNode(targetNode, +1);
      }
    }
  }

  moveNodeUp(targetNode: BaseNode) {
    const {parent} = targetNode;

    if (parent) {
      const children = this.data.filter(node => node.parent === parent);
      const currentIndex = children.indexOf(targetNode);

      if (currentIndex === 0) {
        // go after parent
      }

      if (currentIndex > 0) {
        // move down on current level
        this.moveNode(targetNode, -1);
      }
    }
  }

  pushNode(name: string, parent?: BaseNode) {
    const newNode = this.createNode(name, parent);

    this.data.push(newNode);
    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(newNode));
  }

  addAttribute(name: string, node: BaseNode) {
    node.addAttribute(name);

    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(node));
  }

  setAttribute(name: string, value: string, node: BaseNode) {
    node.setAttribute(name, value);

    this.renderTree();
    this.affectedLines$.next(this.drawer.getNodeIndexes(node));
  }

  getNodeByIndex(index: number): BaseNode | null {
    return this.drawer.getNodeByPosition(0, index);
  }

  getNodeByPosition(x: number, y: number): BaseNode | null {
    const {leftOffset, topOffset} = gameScrollState$.value;
    const rendered = this.renderedLines[y - topOffset];

    if (!rendered) {
      return null;
    }

    const start = rendered.indexOf('<') + leftOffset;
    const end = rendered.indexOf('>') + leftOffset;

    if (x < start || x > end) {
      return null;
    }

    return this.drawer.getNodeByPosition(x - leftOffset, y - topOffset);
  }

  getNodeIndex(node: BaseNode): number {
    const indexes = this.drawer.getNodeIndexes(node);

    return indexes[0] || 0;
  }
}
