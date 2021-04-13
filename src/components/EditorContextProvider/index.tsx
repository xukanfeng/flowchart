import React from 'react';
import editorPropsContext from '../../context/editorPropsContext';
import editorEventContext from '../../context/editorEventContext';

const EditorContextProvider: React.FC<any> = (props) => {
  const {
    onNodeDoubleClick,
    onCustomizedEvent,
    customizedNodes,
    contextMenuDisabled,
    children,
  } = props;

  return (
    <editorPropsContext.Provider
      value={{ customizedNodes, contextMenuDisabled }}
    >
      <editorEventContext.Provider
        value={{ onNodeDoubleClick, onCustomizedEvent }}
      >
        {children}
      </editorEventContext.Provider>
    </editorPropsContext.Provider>
  );
};

export default EditorContextProvider;
