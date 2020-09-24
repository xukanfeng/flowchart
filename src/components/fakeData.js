export const fakeData = {
  id: '0',
  type: 'single-node',
  visible: true,
  deletable: true,
  child: {
    id: '1',
    type: 'single-node',
    visible: true,
    deletable: true,
    child: {
      id: '2',
      type: 'branch-node',
      visible: true,
      deletable: true,
      subNodes: [
        {
          id: '3',
          type: 'single-node',
          visible: true,
          deletable: true,
        },
        {
          id: '4',
          type: 'single-node',
          visible: true,
          deletable: true,
          child: {
            id: '5',
            type: 'single-node',
            visible: true,
            deletable: true,
          },
        },
        {
          id: '6',
          type: 'single-node',
          visible: true,
          deletable: true,
          child: {
            id: '7',
            type: 'condition-node',
            visible: true,
            deletable: true,
            subNodes: [
              {
                id: '8',
                type: 'single-node',
                visible: true,
                deletable: true,
                child: {
                  id: '9',
                  type: 'single-node',
                  visible: true,
                  deletable: true,
                },
              },
              {
                id: '10',
                type: 'single-node',
                visible: true,
                deletable: true,
                child: {
                  id: '11',
                  type: 'single-node',
                  visible: true,
                  deletable: true,
                },
              },
              {
                id: '12',
                type: 'condition-node',
                visible: true,
                deletable: true,
                subNodes: [
                  {
                    id: '13',
                    type: 'single-node',
                    visible: true,
                    deletable: true,
                  },
                  {
                    id: '14',
                    type: 'single-node',
                    visible: true,
                    deletable: true,
                  },
                ],
              },
            ],
            child: {
              id: '15',
              type: 'single-node',
              visible: true,
              deletable: true,
            },
          },
        },
      ],
    },
  },
};
