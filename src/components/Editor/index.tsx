import React from 'react';
//import { NodeData } from '../type';
import SingleNode from '../SingleNode';
import './style.scss';
import BaseNode from '../BaseNode';

export interface EditorProps {
  nodeData: any;
}

const Editor: React.FC<EditorProps> = (props) => {
  const { nodeData } = props;

  return (
    <div className="editor">
      <SingleNode child={nodeData.child}></SingleNode>
      {/*       <SingleNode></SingleNode>
      <SingleNode></SingleNode>
      <BaseNode id=""></BaseNode> */}
    </div>
  );
};

export default Editor;
