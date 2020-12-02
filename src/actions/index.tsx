import { v4 as uuid } from 'uuid';
import { CustomizedNode, ToolTip } from '../Editor';

export const ADD_START_NODE = 'ADD_START_NODE';
export const ADD_SINGLE_NODE = 'ADD_SINGLE_NODE';
export const ADD_BRANCH_NODE = 'ADD_BRANCH_NODE';
export const ADD_BRANCH_SUB_NODE = 'ADD_BRANCH_SUB_NODE';
export const ADD_CONDITION_NODE = 'ADD_CONDITION_NODE';
export const ADD_CONDITION_SUB_NODE = 'ADD_CONDITION_SUB_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const DELETE_CHILDREN = 'DELETE_CHILDREN';
export const DELETE_NODE_AND_CHILDREN = 'DELETE_NODE_AND_CHILDREN';
export const FOLD_NODES = 'FOLD_NODES';
export const UNFOLD_NODES = 'UNFOLD_NODES';
export const SWAP_NODES = 'SWAP_NODES';
export const UPDATE_NODES = 'UPDATE_NODES';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const addStartNode = () => ({
  type: ADD_START_NODE,
  payload: {
    node: {
      id: uuid(),
      type: 'single-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: false,
    },
  },
});

export const addSingleNode = (id: string) => ({
  type: ADD_SINGLE_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'single-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: true,
    },
  },
});

export const addBranchNode = (id: string) => ({
  type: ADD_BRANCH_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'branch-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: true,
      subNodes: [
        {
          id: uuid(),
          type: 'single-node',
          timestamp: new Date().toString(),
          visible: true,
          deletable: false,
          child: null,
        },
        {
          id: uuid(),
          type: 'single-node',
          timestamp: new Date().toString(),
          visible: true,
          deletable: false,
          child: null,
        },
      ],
    },
  },
});

export const addBranchSubNode = (id: string) => ({
  type: ADD_BRANCH_SUB_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'single-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: true,
      child: null,
    },
  },
});

export const addConditionNode = (id: string) => ({
  type: ADD_CONDITION_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'condition-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: true,
      subNodes: [
        {
          id: uuid(),
          type: 'single-node',
          timestamp: new Date().toString(),
          visible: true,
          deletable: false,
          child: null,
        },
        {
          id: uuid(),
          type: 'single-node',
          timestamp: new Date().toString(),
          visible: true,
          deletable: false,
          child: null,
        },
      ],
    },
  },
});

export const addConditionSubNode = (id: string) => ({
  type: ADD_CONDITION_SUB_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'single-node',
      timestamp: new Date().toString(),
      visible: true,
      deletable: true,
      child: null,
    },
  },
});

export const deleteNode = (id: string) => ({
  type: DELETE_NODE,
  payload: { id },
});

export const deleteChildren = (id: string) => ({
  type: DELETE_CHILDREN,
  payload: { id },
});

export const deleteNodeAndChildren = (id: string) => ({
  type: DELETE_NODE_AND_CHILDREN,
  payload: { id },
});

export const foldNodes = (id: string) => ({
  type: FOLD_NODES,
  payload: { id },
});

export const unfoldNodes = (id: string) => ({
  type: UNFOLD_NODES,
  payload: { id },
});

export const swapNodes = (sourceNodeId: string, targetNodeId: string) => ({
  type: SWAP_NODES,
  payload: {
    sourceNodeId,
    targetNodeId,
  },
});

export const updateNodes = (
  customizedNodes?: Array<CustomizedNode>,
  toolTips?: Array<ToolTip>
) => ({
  type: UPDATE_NODES,
  customizedNodes,
  toolTips,
});
