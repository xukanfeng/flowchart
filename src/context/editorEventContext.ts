import { createContext } from 'react';

const initialEditorEventContext: {
  onNodeDoubleClick?: (id: string) => any;
  onCustomizedEvent?: (...args: any) => any;
} = { onNodeDoubleClick: () => {}, onCustomizedEvent: () => {} };

export default createContext(initialEditorEventContext);
