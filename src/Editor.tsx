import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
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
  dragable?: boolean;
  scalable?: boolean;
}

const Editor: React.FC<EditorProps> = (props) => {
  const {
    data,
    customizedNodes,
    onNodeDoubleClick,
    onSave,
    dragable,
    scalable,
  } = props;
  const [nodeData, dispatch] = useReducer(reducer, data || {});
  const [scaleRate, setScaleRate] = useState(100);
  const [topPos, setTopPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const scroll = (event: any) => {
    const wheel = /*event.wheelDelta || */ event.detail;
    wheel > 0
      ? setScaleRate((prev) => prev + 2)
      : setScaleRate((prev) => prev - 2);
    event.preventDefault();
  };

  const move = (event: any) => {
    if (!dragable) return;
    containerRef!.current!.style.cursor = 'move';
    const x = event.clientX - editorRef!.current!.offsetLeft;
    const y = event.clientY - editorRef!.current!.offsetTop;
    document.onmousemove = (event) => {
      editorRef!.current!.style.left = event.clientX - x + 'px';
      editorRef!.current!.style.top = event.clientY - y + 'px';
    };
    document.onmouseup = (event) => {
      containerRef!.current!.style.cursor = 'default';
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  const initPos = () => {
    const containerWidth = containerRef!.current!.offsetWidth;
    const editorWidth = editorRef!.current!.offsetWidth;
    const editorHeight = editorRef!.current!.offsetHeight;
    scaleRate < 100
      ? setTopPos((prev) => prev - (editorHeight * (1 - scaleRate / 100)) / 2)
      : setTopPos((prev) => prev + (editorHeight * (scaleRate / 100 - 1)) / 2);
    editorRef!.current!.style.left = (containerWidth - editorWidth) / 2 + 'px';
    editorRef!.current!.style.top = topPos + 'px';
  };

  useEffect(() => {
    if (scalable) {
      containerRef!.current!.onmousedown = (event) => move(event);
      containerRef!.current!.addEventListener('mousewheel', scroll);
    }
    initPos();
    return () => {
      containerRef!.current!.removeEventListener('mousewheel', scroll);
    };
  }, [containerRef]);

  useEffect(() => {
    !data && dispatch(addStartNode());
    customizedNodes && dispatch(updateNodes(customizedNodes));
  }, [data, customizedNodes]);

  return (
    <editorContext.Provider value={{ nodeData, dispatch, onNodeDoubleClick }}>
      <div className="container" ref={containerRef}>
        <Button onClick={onSave && (() => onSave(nodeData as SingleNodeData))}>
          保存
        </Button>
        <div
          className="editor"
          style={{
            transform: `scale(${scaleRate / 100})`,
            position: dragable ? 'absolute' : 'static',
            top: topPos + 'px',
          }}
          ref={editorRef}
        >
          <SingleNode {...(nodeData as SingleNodeProps)}></SingleNode>
        </div>
      </div>
    </editorContext.Provider>
  );
};

export default Editor;
