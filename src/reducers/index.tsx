import {
  INIT_NODE_DATA_MAP,
  ADD_START_NODE,
  ADD_SINGLE_NODE,
  ADD_BRANCH_NODE,
  ADD_BRANCH_SUB_NODE,
  ADD_CONDITION_NODE,
  ADD_CONDITION_SUB_NODE,
  DELETE_NODE,
  DELETE_CHILDREN,
  DELETE_NODE_AND_CHILDREN,
  FOLD_NODES,
  UNFOLD_NODES,
  SWAP_NODES,
  UPDATE_NODES,
} from '../actions';
import { findParentNode, findBranchOrConditionNode } from '../utils/findNode';
import {
  NodeData,
  SingleNodeData,
  BranchNodeData,
  ConditionNodeData,
  CustomizedNode,
  ToolTip,
} from '../Editor';

export interface NodeDataState {
  nodeData: SingleNodeData;
  nodeDataMap: Map<string, NodeData>;
}

export const initialNodeDataState = {
  nodeData: {} as SingleNodeData,
  nodeDataMap: new Map(),
};

const updateNodeDataMap: (
  nodeData: NodeData | undefined | null,
  nodeDataMap: Map<string, NodeData>,
  // true to add, false to remove
  flag?: boolean
) => void = (nodeData, nodeDataMap, flag = true) => {
  if (!nodeData) return;

  flag
    ? nodeDataMap.set(nodeData.id, {...nodeData})
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

const handleNodeOperation = (state: NodeDataState, action: any) => {
  const { nodeData, nodeDataMap } = state;
  const { id, node } = action.payload;
  const curNodeData = nodeDataMap.get(id);
  if (!curNodeData) return state;

  switch (action.type) {
    case ADD_SINGLE_NODE:
    case ADD_BRANCH_NODE:
    case ADD_CONDITION_NODE: {
      const curNode = curNodeData as SingleNodeData | ConditionNodeData;
      node.child = curNode.child;
      curNode.child = node;
      curNode.timestamp = new Date().toString();
      updateNodeDataMap(curNode, nodeDataMap);
      return { ...state };
    }
    case ADD_BRANCH_SUB_NODE:
    case ADD_CONDITION_SUB_NODE: {
      const curNode = curNodeData as BranchNodeData | ConditionNodeData;
      curNode.subNodes.push(node);
      curNode.subNodes.forEach((item) => {
        // if there are just two sub-node before adding, the sub-node should be rerendered to update the context menu
        if (!item.deletable) {
          item.timestamp = new Date().toString();
        }
        item.deletable = true;
      });
      curNode.timestamp = new Date().toString();
      updateNodeDataMap(curNode, nodeDataMap);
      return { ...state };
    }
    case DELETE_NODE:
    case DELETE_NODE_AND_CHILDREN: {
      const parentNode = findParentNode(nodeData, id) as
        | SingleNodeData
        | ConditionNodeData;
      // the start-node and the direct sub-nodes in branch-node or condition-node don't have parent; the start-node is ignored because it's undeletable.
      if (!parentNode) {
        const branchOrConditionNode = findBranchOrConditionNode(nodeData, id);
        if (!branchOrConditionNode) return state;
        const subNodes = (branchOrConditionNode as
          | BranchNodeData
          | ConditionNodeData).subNodes;
        subNodes.some((item, index) => {
          if (item.id === id) {
            const subNode = item as SingleNodeData | ConditionNodeData;
            if (action.type === DELETE_NODE) {
              if (subNode.child) subNodes.splice(index, 1, subNode.child);
              else subNodes.splice(index, 1);
              updateNodeDataMap(
                { ...subNode, child: null },
                nodeDataMap,
                false
              );
            } else {
              subNodes.splice(index, 1);
              updateNodeDataMap(subNode, nodeDataMap, false);
            }
            return true;
          }
          return false;
        });
        // branches or conditions can only be deleted while there are two or more in branch-node or condition-node.
        if (subNodes.length > 2) {
          subNodes.forEach((item) => (item.deletable = true));
        } else {
          subNodes.forEach((item) => {
            // if there are just two sub-node after deleting, the sub-node should be rerendered to update the context menu
            if (item.deletable) {
              item.timestamp = new Date().toString();
            }
            item.deletable = false;
          });
        }
        branchOrConditionNode.timestamp = new Date().toString();
        updateNodeDataMap(branchOrConditionNode, nodeDataMap);
      } else {
        const curNode = curNodeData as SingleNodeData | ConditionNodeData;
        if (action.type === DELETE_NODE) {
          parentNode.child = curNode.child;
          // set the child as null to avoid traversing when just delete one node
          updateNodeDataMap({ ...curNode, child: null }, nodeDataMap, false);
        } else {
          let lastChild = curNode.child;
          while (lastChild) {
            lastChild = (lastChild as SingleNodeData | ConditionNodeData).child;
          }
          // last child may be null or undefined, the new child should keep the same
          parentNode.child = lastChild;
          // traverse to delete the current node and the children
          updateNodeDataMap(curNode, nodeDataMap, false);
        }
        parentNode.timestamp = new Date().toString();
        updateNodeDataMap(parentNode, nodeDataMap);
      }
      return { ...state };
    }
    case DELETE_CHILDREN: {
      const curNode = curNodeData as SingleNodeData | ConditionNodeData;
      //  traverse to delete the children from node data map before the children removed
      updateNodeDataMap(curNode.child, nodeDataMap, false);
      let lastChild = curNode.child;
      while (lastChild) {
        lastChild = (lastChild as SingleNodeData | ConditionNodeData).child;
      }
      curNode.child = lastChild;
      curNode.timestamp = new Date().toString();
      updateNodeDataMap(curNode, nodeDataMap);
      return { ...state };
    }
    case FOLD_NODES:
    case UNFOLD_NODES: {
      const curNode = curNodeData as BranchNodeData | ConditionNodeData;
      curNode.folded = action.type === FOLD_NODES ? true : false;
      curNode.subNodes.forEach((item) => {
        item.visible = action.type === FOLD_NODES ? false : true;
      });
      curNode.timestamp = new Date().toString();
      return { ...state };
    }
    default:
      return state;
  }
};

const reducer = (state: NodeDataState, action: any) => {
  console.log('reducer', action.type, state);
  const { nodeData, nodeDataMap } = state;
  switch (action.type) {
    case INIT_NODE_DATA_MAP: {
      updateNodeDataMap(nodeData, nodeDataMap);
      return { ...state };
    }
    case ADD_START_NODE: {
      updateNodeDataMap(action.payload.node, nodeDataMap);
      return { ...state, nodeData: action.payload.node };
    }
    case SWAP_NODES: {
      const { sourceNodeId, targetNodeId } = action.payload;
      if (sourceNodeId === targetNodeId) return state;

      const branchOrConditionNodeOfSourceNode = findBranchOrConditionNode(
        nodeData,
        sourceNodeId
      );
      const branchOrConditionNodeOfTargetNode = findBranchOrConditionNode(
        nodeData,
        targetNodeId
      );
      if (
        !branchOrConditionNodeOfSourceNode ||
        !branchOrConditionNodeOfTargetNode ||
        branchOrConditionNodeOfSourceNode !== branchOrConditionNodeOfTargetNode
      )
        return state;

      const subNodes = (branchOrConditionNodeOfSourceNode as
        | BranchNodeData
        | ConditionNodeData).subNodes;
      let sourceNodeIndex = -1;
      let targetNodeIndex = -1;
      subNodes.forEach((item, index) => {
        if (item.id === sourceNodeId) sourceNodeIndex = index;
        if (item.id === targetNodeId) targetNodeIndex = index;
      });
      [subNodes[sourceNodeIndex], subNodes[targetNodeIndex]] = [
        subNodes[targetNodeIndex],
        subNodes[sourceNodeIndex],
      ];
      branchOrConditionNodeOfSourceNode.timestamp = new Date().toString();
      return { ...state };
    }
/*     case UPDATE_NODES: {
      const { customizedNodes, toolTips = [] } = action;
      customizedNodes.forEach((item: CustomizedNode, key: string) => {
        const node = nodeDataMap.get(key);
        if (node) node.customShape = item;
      });
      (toolTips as ToolTip[]).forEach((item) => {
        const node = nodeDataMap.get(item.id);
        if (node) node.toolTip = { ...item };
      });
      return { ...state };
    } */
    default:
      return handleNodeOperation(state, action);
  }
};

export { reducer };
