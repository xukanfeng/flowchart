import React from 'react';
import { NodeData } from '../type';
import SingleNode from '../SingleNode';
import './style.scss';

export interface EditorProps {
  nodeData: NodeData;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { nodeData } = props;

  return (
    <div className="editor">
      <SingleNode id={nodeData.id} children={nodeData.children}></SingleNode>
    </div>
  );
};

export default Editor;
