export const ADD_SINGLE_NODE = 'ADD_SINGLE_NODE';
export const ADD_BRANCH_NODE = 'ADD_BRANCH_NODE';
export const ADD_CONDITION_NODE = 'ADD_CONDITION_NODE';
export const DELETE_NODE = 'DELETE_NODE';

export const addSingleNode = (nodeId: string) => ({
  type: ADD_SINGLE_NODE,
  data: {
    nodeId,
    id: '0',
    type: 'single-node',
  },
});

export const addBranchNode = (nodeId: string) => ({
  type: ADD_BRANCH_NODE,
  data: {
    nodeId,
    id: '0',
    type: 'branch-node',
    branches: [
      {
        id: '0',
        type: 'single-node',
      },
      {
        id: '0',
        type: 'single-node',
      },
    ],
  },
});

export const addConditionNode = (nodeId: string) => ({
  type: ADD_CONDITION_NODE,
  data: {
    nodeId,
    id: '0',
    type: 'condition-node',
    conditions: [
      {
        id: '0',
        type: 'single-node',
      },
      {
        id: '0',
        type: 'single-node',
      },
    ],
  },
});

export const deleteNode = (nodeId: string) => ({
  type: DELETE_NODE,
  nodeId,
});
