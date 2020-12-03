import {
  NodeData,
  SingleNodeData,
  BranchNodeData,
  ConditionNodeData,
} from '../Editor';

const updateNodeDataMap: (
  nodeData: NodeData | undefined | null,
  nodeDataMap: Map<string, NodeData>,
  flag?: boolean
) => void = (nodeData, nodeDataMap, flag = true) => {
  if (!nodeData) return;

  flag
    ? nodeDataMap.set(nodeData.id, nodeData)
    : nodeDataMap.delete(nodeData.id);

  switch (nodeData.type) {
    case 'single-node':
      updateNodeDataMap((nodeData as SingleNodeData).child, nodeDataMap, flag);
      break;
    case 'branch-node':
    case 'condition-node': {
      for (let subNode of (nodeData as BranchNodeData | ConditionNodeData)
        .subNodes) {
        updateNodeDataMap(subNode, nodeDataMap, flag);
      }
      if (nodeData.type === 'condition-node')
        updateNodeDataMap(
          (nodeData as ConditionNodeData).child,
          nodeDataMap,
          flag
        );
      break;
    }
    default:
      break;
  }
};

export default updateNodeDataMap;
