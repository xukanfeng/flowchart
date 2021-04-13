import { createContext } from 'react';
import { CustomizedNode } from '../Editor';

const initialEditorPropsContext: {
  customizedNodes?: Map<string, CustomizedNode>
  contextMenuDisabled?: boolean;
} = { contextMenuDisabled: false };

export default createContext(initialEditorPropsContext);
