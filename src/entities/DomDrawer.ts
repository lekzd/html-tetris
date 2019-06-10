import {INodeSection, BaseNode, NodeSectionType} from "../nodes/Node";
import {IAttributes} from "./IAttributes";
import {Stack} from '../utils/Stack';

export class DomDrawer {

  indexesStack = new Stack<number>([]);

  private renderedLines: string[] = [];
  private renderedIndexes = new Map<number, BaseNode>();
  private openedIndexes: number[] = [];
  private spacesCount: number = 2;

  constructor(private nodes: BaseNode[]) {};

  private traverseNodes(deepIndex: number, parent: BaseNode) {
    const nodes = this.nodes.filter(node => node.parent === parent);

    nodes.forEach(node => {
      const openTag = this.getOpenTag(node, node.attributes);
      const index = this.renderedLines.push(openTag.padStart(openTag.length + deepIndex, ' '));

      node.renderedMetrics = this.getRenderedMetrics(deepIndex, node, node.attributes);

      this.renderedIndexes.set(index - 1, node);
      this.openedIndexes.push(index - 1);

      this.traverseNodes(deepIndex + this.spacesCount, node);

      if (!node.childless) {
        const closedTag = this.getCloseTag(node);
        const index = this.renderedLines.push(closedTag.padStart(closedTag.length + deepIndex, ' '));

        this.renderedIndexes.set(index - 1, node);
      }
    });
  }

  private getRenderedMetrics(deepIndex: number, tag: BaseNode, attributes: IAttributes): INodeSection[] {
    let currentIndex = deepIndex + 1;

    const result: INodeSection[] = [{
      type: NodeSectionType.TAG,
      name: tag.name,
      value: '',
      start: currentIndex,
      end: currentIndex + tag.name.length,
    }];

    currentIndex += tag.name.length + 1;

    if (attributes.size) {
      [...attributes.keys()]
        .sort()
        .map(key => ([key, attributes.get(key)]))
        .forEach(([name, value]) => {
          if (!name) {
            return;
          }

          const {length} = `${name}="${value}"`;

          result.push({
            type: NodeSectionType.ATTR,
            name,
            value: value || '',
            start: currentIndex,
            end: currentIndex + length,
          });

          currentIndex += length + 1;
        });
    }

    return result;
  }

  private getOpenTag(tag: BaseNode, attributes: IAttributes): string {
    let str = `<${tag.name}>`;

    let propsStringified = '';

    if (attributes.size) {
      propsStringified = [...attributes.keys()]
        .sort()
        .map(key => `${key}="${attributes.get(key)}"`)
        .join(' ');

      str = `<${tag.name} ${propsStringified}>`;
    }

    if (tag.childless) {
      str = `<${tag.name} ${propsStringified}/>`;
    }

    return str;
  }

  private getCloseTag(tag: BaseNode): string {
    return `</${tag.name}>`;
  }

  setSpaces(value: number) {
    this.spacesCount = value;
  }

  getNodeIndexes(node: BaseNode): number[] {
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
    this.openedIndexes = [];
    this.renderedLines = [];
    this.traverseNodes(0, undefined as any as BaseNode);

    this.indexesStack.set(this.openedIndexes);

    return this.renderedLines;
  }

  getNodeByPosition(x: number, y: number): BaseNode | null {
    const node = this.renderedIndexes.get(y) || null;

    return node;
  }
}
