import { createContext } from 'react';

const initialEditorEventContext: {
  onNodeDoubleClick?: (id: string) => any;
} = { onNodeDoubleClick: () => {} };

export default createContext(initialEditorEventContext);
