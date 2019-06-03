import {Node} from "./Node";
import {IAttributes} from "./IAttributes";

export class DomDrawer {

  private renderedLines: string[] = [];
  private renderedIndexes = new Map<number, Node>();

  constructor(private nodes: Node[]) {};

  private traverseNodes(deepIndex: number, parent: Node) {
    const nodes = this.nodes.filter(node => node.parent === parent);

    nodes.forEach(node => {
      const openTag = this.getOpenTag(node, node.attributes);
      const index = this.renderedLines.push(openTag.padStart(openTag.length + deepIndex, ' '));

      this.renderedIndexes.set(index - 1, node);

      this.traverseNodes(deepIndex + 4, node);

      if (!node.childless) {
        const closedTag = this.getCloseTag(node);
        const index = this.renderedLines.push(closedTag.padStart(closedTag.length + deepIndex, ' '));

        this.renderedIndexes.set(index - 1, node);
      }
    });
  }

  private getOpenTag(tag: Node, attributes: IAttributes): string {
    let str = `<${tag.name}>`;

    if (attributes.size) {
      const propsStringified = [...attributes.entries()]
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');

      str = `<${tag.name} ${propsStringified}>`;
    }

    if (tag.childless) {
      str = `<${tag.name}/>`;
    }

    return str;
  }

  private getCloseTag(tag: Node): string {
    return `</${tag.name}>`;
  }

  getNodeIndexes(node: Node): number[] {
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
    this.traverseNodes(0, undefined as any as Node);

    return this.renderedLines;
  }

  getNodeByPosition(x: number, y: number): Node | null {
    const node = this.renderedIndexes.get(y) || null;

    return node;
  }
}
