import {
  NodeData,
  SingleNodeData,
  BranchNodeData,
  ConditionNodeData,
} from '../Editor';

export const findNode: (
  nodeData: NodeData | undefined | null,
  match: (...args: any) => boolean
) => NodeData | undefined = (nodeData, match) => {
  if (!nodeData) return;
  if (match(nodeData)) {
    return nodeData;
  }
  switch (nodeData.type) {
    case 'single-node':
      return findNode((nodeData as SingleNodeData).child, match);
    case 'branch-node':
    case 'condition-node': {
      for (let subNode of (nodeData as BranchNodeData | ConditionNodeData)
        .subNodes) {
        const node = findNode(subNode, match);
        if (node) return node;
      }
      if (nodeData.type === 'condition-node')
        return findNode((nodeData as ConditionNodeData).child, match);
      else return;
    }
    default:
      return;
  }
};

const _findNodeById: (node: NodeData, id: string) => boolean = (node, id) => {
  if (!node) return false;
  return node.id === id;
};

export const findNodeById = (nodeData: NodeData, id: string) => {
  return findNode(nodeData, (node) => _findNodeById(node, id));
};

const _findParentNode: (node: NodeData, childNodeId: string) => boolean = (
  node,
  childNodeId
) => {
  if (!node) return false;
  const nodeData = node as SingleNodeData | ConditionNodeData;
  return !!nodeData.child && nodeData.child.id === childNodeId;
};

export const findParentNode = (nodeData: NodeData, childNodeId: string) => {
  return findNode(nodeData, (node) => _findParentNode(node, childNodeId));
};

const _findBranchOrConditionNode: (
  node: NodeData,
  subNodeId: string
) => boolean = (node, subNodeId) => {
  if (!node) return false;
  const nodeData = node as BranchNodeData | ConditionNodeData;
  return (
    !!nodeData.subNodes &&
    nodeData.subNodes.some((subNode) => subNode.id === subNodeId)
  );
};

export const findBranchOrConditionNode = (
  nodeData: NodeData,
  subNodeId: string
) => {
  return findNode(nodeData, (node) =>
    _findBranchOrConditionNode(node, subNodeId)
  );
};
