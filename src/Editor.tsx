import React, { useReducer, useEffect, ReactNode } from 'react';
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
  toolTip?: string | ReactNode;
}

export type NodeProps = SingleNodeProps | BranchNodeProps | ConditionNodeProps;

export interface SingleNodeProps extends NodeBaseProps {
  child?: NodeProps | null; // the child of the last single-node of condition in condition-node is null, distinguish from the ones in other situation which are undefined.
}

export interface BranchNodeProps extends NodeBaseProps {
  folded: boolean;
  subNodes: Array<NodeProps>;
}

export interface ConditionNodeProps extends NodeBaseProps {
  folded: boolean;
  subNodes: Array<NodeProps>;
  child?: NodeProps | null; // the child of the last condition-node (if exists) of condition in condition-node is null, distinguish from the ones in other situation which are undefined.
}

export type NodeData = NodeProps;

export type SingleNodeData = SingleNodeProps;

export type BranchNodeData = BranchNodeProps;

export type ConditionNodeData = ConditionNodeProps;

export interface CustomizedNode {
  id: string;
  shape: JSX.Element;
}

export interface EditorProps {
  data?: SingleNodeData;
  customizedNodes?: Array<CustomizedNode>;
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
