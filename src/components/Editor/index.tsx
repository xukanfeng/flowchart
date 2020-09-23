import React, { useReducer } from 'react';
import { Button } from 'antd';
import SingleNode, { SingleNodeProps } from '../SingleNode';
import { reducer, nodeDataContext } from '../../reducers';
import { addStartNode } from '../../actions';
import './style.scss';

export interface EditorProps {
  nodeData?: SingleNodeProps;
  onSave?: (data: SingleNodeProps) => any;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { nodeData, onSave } = props;
  const [state, dispatch] = useReducer(reducer, nodeData || {});

  if (!nodeData) {
    dispatch(addStartNode());
  }

  const nodeProps = nodeData as SingleNodeProps;
  return (
    <nodeDataContext.Provider value={{ state, dispatch }}>
      <div className="editor">
        <Button onClick={onSave && (() => onSave(state as SingleNodeProps))}>
          保存
        </Button>
        <SingleNode
          id={nodeProps.id}
          type={nodeProps.type}
          child={nodeProps.child}
        ></SingleNode>
      </div>
    </nodeDataContext.Provider>
  );
};

export default Editor;
