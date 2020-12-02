import { createContext } from 'react';

const initialEditorPropsContext: {
  contextMenuDisabled?: boolean;
} = { contextMenuDisabled: false };

export default createContext(initialEditorPropsContext);
