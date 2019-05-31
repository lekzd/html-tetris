import {INode} from "./INode";
import {IAttributes} from "./IAttributes";

export class DomDrawer {

  private renderedLines: string[] = [];
  private renderedIndexes = new Map<number, INode>();

  constructor(private nodes: INode[],
              private attributes: WeakMap<INode, IAttributes>) {};

  private traverseNodes(deepIndex: number, parent: INode) {
    const nodes = this.nodes.filter(node => node.parent === parent);

    nodes.forEach(node => {
      const attributes = this.attributes.get(node);

      if (!attributes) {
        return;
      }

      const openTag = this.getOpenTag(node, attributes);
      const index = this.renderedLines.push(openTag.padStart(openTag.length + deepIndex, ' '));

      this.renderedIndexes.set(index - 1, node);

      this.traverseNodes(deepIndex + 4, node);

      if (!node.isCollapsed) {
        const closedTag = this.getCloseTag(node);
        const index = this.renderedLines.push(closedTag.padStart(closedTag.length + deepIndex, ' '));

        this.renderedIndexes.set(index - 1, node);
      }
    });
  }

  private getOpenTag(tag: INode, attributes: IAttributes): string {
    let str = `<${tag.name}>`;

    if (attributes.size) {
      const propsStringified = [...attributes.entries()]
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      str = `<${tag.name} ${propsStringified}>`;
    }

    if (tag.isCollapsed) {
      str = `<${tag.name}/>`;
    }

    return str;
  }

  private getCloseTag(tag: INode): string {
    return `</${tag.name}>`;
  }

  getNodeIndexes(node: INode): number[] {
    const result: number[] = [];

    this.renderedIndexes.forEach((renderedNode, index) => {
      if (renderedNode === node) {
        result.push(index);
      }
    });

    return result;
  }

  getRenderedStrings(): string[] {
    this.renderedIndexes.clear();
    this.renderedLines = [];
    this.traverseNodes(0, undefined as any as INode);

    return this.renderedLines;
  }

  getNodeByPosition(x: number, y: number): INode | null {
    const node = this.renderedIndexes.get(y) || null;

    return node;
  }
}
