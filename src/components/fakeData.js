export const fakeData = {
  id: '0',
  type: 'single-node',
  child: {
    id: '1',
    type: 'single-node',
    child: {
      id: '2',
      type: 'branch-node',
      branches: [
        {
          id: '3',
          type: 'single-node',
        },
        {
          id: '4',
          type: 'single-node',
          child: {
            id: '5',
            type: 'single-node',
          },
        },
        {
          id: '6',
          type: 'single-node',
          child: {
            id: '7',
            type: 'condition-node',
            conditions: [
              {
                id: '8',
                type: 'single-node',
                child: {
                  id: '9',
                  type: 'single-node',
                },
              },
              {
                id: '10',
                type: 'single-node',
                child: {
                  id: '11',
                  type: 'single-node',
                },
              },
              {
                id: '12',
                type: 'condition-node',
                conditions: [
                  {
                    id: '13',
                    type: 'single-node',
                  },
                  {
                    id: '14',
                    type: 'single-node',
                  },
                ],
              },
            ],
            child: {
              id: '15',
              type: 'single-node',
            },
          },
        },
      ],
    },
  },
};
