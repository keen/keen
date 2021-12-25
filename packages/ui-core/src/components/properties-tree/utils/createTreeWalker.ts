import { DataNode } from '../types';

const getNodeData = (
  { id, children, name }: DataNode,
  nestingLevel: number,
  isOpenByDefault: boolean
) => {
  return {
    data: {
      id,
      name,
      isOpenByDefault,
      nestingLevel,
      isLeaf: Array.isArray(children),
      schemaMeta: Array.isArray(children) ? children : null,
    },
    children,
  };
};

const createTreeWalker = (
  properties: Record<string, string[] | Record<string, any>>,
  isOpenByDefault: boolean
) => {
  return function* treeWalker() {
    const parentNodes: any = [];
    const parent = Object.keys(properties);

    parent.forEach((key) =>
      parentNodes.push({
        name: key,
        id: key,
        children: properties[key],
      })
    );

    for (let i = parentNodes.length - 1; i >= 0; i--) {
      yield getNodeData(parentNodes[i], 0, isOpenByDefault);
    }

    while (true) {
      const parent = yield;
      if (!parent.data.isLeaf) {
        const children = Object.keys(parent.children);
        for (let i = children.length - 1; i >= 0; i--) {
          const child = {
            name: children[i],
            id: parent.data.name + '.' + children[i],
            children: parent.children[children[i]],
          };
          yield getNodeData(
            child,
            parent.data.nestingLevel + 1,
            isOpenByDefault
          );
        }
      }
    }
  };
};

export default createTreeWalker;
