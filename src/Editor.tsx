import React, { useReducer, useEffect } from 'react';
import { Button } from 'antd';
import SingleNode from './components/SingleNode';
import { reducer, editorContext } from './reducers';
import { addStartNode, updateNodes } from './actions';
import './Editor.scss';

export interface NodeBaseProps {
  id: string;
  name?: string;
  type: string;
  visible: boolean;
  deletable: boolean;
  customShape?: JSX.Element;
}

export type NodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps;

export interface SingleNodeProps extends NodeBaseProps {
  child?: NodeProps;
}

export interface BranchNodeProps extends NodeBaseProps {
  folded: boolean;
  subNodes: Array<NodeProps>;
}

export interface ConditionNodeProps extends NodeBaseProps {
  folded: boolean;
  subNodes: Array<NodeProps>;
  child?: NodeProps;
}

export type NodeData = NodeProps;

export type SingleNodeData = SingleNodeProps;

export type BranchNodeData = BranchNodeProps;

export type ConditionNodeData = ConditionNodeProps;

export interface EditorProps {
  data?: SingleNodeData;
  customizedNodes?: Array<{ id: string; shape: JSX.Element }>;
  contextMenuDisabled?: boolean;
  onNodeDoubleClick?: (id: string) => any;
  onSave?: (data: SingleNodeData) => any;
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
        <Button onClick={onSave && (() => onSave(nodeData as SingleNodeData))}>
          保存
        </Button>
        <SingleNode {...(nodeData as SingleNodeProps)}></SingleNode>
      </div>
    </editorContext.Provider>
  );
};

export default Editor;
