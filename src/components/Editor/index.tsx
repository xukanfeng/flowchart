import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import { Button } from 'antd';
import SingleNode from '../SingleNode';
import './style.scss';

export interface EditorProps {
  nodeData: any;
  onSave?: (data: any) => any;
}

const store = createStore(reducer)

const Editor: React.FC<EditorProps> = (props) => {
  const { nodeData, onSave } = props;

  return (
    <Provider store={store}>
      <div className="editor">
        <Button onClick={onSave && (() => onSave(nodeData))}>保存</Button>
        <SingleNode child={nodeData.child}></SingleNode>
      </div>
    </Provider>
  );
};

export default Editor;
