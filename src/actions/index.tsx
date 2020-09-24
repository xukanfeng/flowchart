import { v4 as uuid } from 'uuid';
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
export const UPDATE_NODES = 'UPDATE_NODES';

export const UNDO = 'UNDO';
export const REDO = 'REDO';

export const addStartNode = () => ({
  type: ADD_START_NODE,
  payload: {
    node: {
      id: uuid(),
      type: 'single-node',
      visible: true,
      deletable: false,
    },
  },
});

export const addSingleNode = (id: string) => ({
  type: ADD_SINGLE_NODE,
  payload: {
    id,
    node: { id: uuid(), type: 'single-node', visible: true, deletable: false },
  },
});

export const addBranchNode = (id: string) => ({
  type: ADD_BRANCH_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'branch-node',
      visible: true,
      deletable: true,
      branches: [
        {
          id: uuid(),
          type: 'single-node',
          visible: true,
          deletable: false,
        },
        {
          id: uuid(),
          type: 'single-node',
          visible: true,
          deletable: false,
        },
      ],
    },
  },
});

export const addBranchSubNode = (id: string) => ({
  type: ADD_BRANCH_SUB_NODE,
  payload: {
    id,
    node: { id: uuid(), type: 'single-node', visible: true, deletable: true },
  },
});

export const addConditionNode = (id: string) => ({
  type: ADD_CONDITION_NODE,
  payload: {
    id,
    node: {
      id: uuid(),
      type: 'condition-node',
      visible: true,
      deletable: true,
      conditions: [
        {
          id: uuid(),
          type: 'single-node',
          visible: true,
          deletable: false,
        },
        {
          id: uuid(),
          type: 'single-node',
          visible: true,
          deletable: false,
        },
      ],
    },
  },
});

export const addConditionSubNode = (id: string) => ({
  type: ADD_CONDITION_SUB_NODE,
  payload: { id },
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

export const updateNodes = (
  customizedNodes: Array<{ id: string; shape: JSX.Element }>
) => ({
  type: UPDATE_NODES,
  customizedNodes,
});
