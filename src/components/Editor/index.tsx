import React, { useReducer, useEffect } from 'react';
import { Button } from 'antd';
import SingleNode, { SingleNodeProps } from '../SingleNode';
import { reducer, editorContext } from '../../reducers';
import { addStartNode, updateNodes } from '../../actions';
import './style.scss';

export interface EditorProps {
  data?: SingleNodeProps;
  customizedNodes?: Array<{ id: string; shape: JSX.Element }>;
  contextMenuDisabled?: boolean;
  onNodeDoubleClick?: (id: string) => any;
  onSave?: (data: SingleNodeProps) => any;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { data, customizedNodes, onNodeDoubleClick, onSave } = props;
  const [nodeData, dispatch] = useReducer(reducer, data || {});
  
  useEffect(() => {
    !data && dispatch(addStartNode());
    customizedNodes && dispatch(updateNodes(customizedNodes));
  }, [data, customizedNodes]);

  return (
    <editorContext.Provider value={{ nodeData, dispatch, onNodeDoubleClick }}>
      <div className="editor">
        <Button onClick={onSave && (() => onSave(nodeData as SingleNodeProps))}>
          保存
        </Button>
        <SingleNode
          {...data as SingleNodeProps}
        ></SingleNode>
      </div>
    </editorContext.Provider>
  );
};

export default Editor;
