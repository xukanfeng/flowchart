import React from 'react';
import editorPropsContext from '../../context/editorPropsContext';
import editorEventContext from '../../context/editorEventContext';

const EditorContextProvider: React.FC<any> = (props) => {
  const { onNodeDoubleClick, contextMenuDisabled, children } = props;

  return (
    <editorPropsContext.Provider value={{ contextMenuDisabled }}>
      <editorEventContext.Provider value={{ onNodeDoubleClick }}>
        {children}
      </editorEventContext.Provider>
    </editorPropsContext.Provider>
  );
};

export default EditorContextProvider;
