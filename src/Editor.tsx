import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { Slider } from 'antd';
import Toolbar from './components/Toolbar';
import EditorProvider from './components/EditorContextProvider';
import NodeDataProvider from './components/NodeDataProvider';
import SingleNode from './components/SingleNode';
import { reducer } from './reducers';
import { initNodeDataMap, addStartNode, updateNodes } from './actions';
import { useThrottleFn, usePersistFn } from 'ahooks';
import './Editor.scss';

export interface NodeStyle {
  shape?: string;
  size?: string;
}

export interface NodeBaseProps {
  id: string;
  name?: string;
  type: string;
  timestamp?: string;
  visible: boolean;
  deletable: boolean;
  style?: NodeStyle;
  customShape?: JSX.Element;
  toolTip?: ToolTip;
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

export interface ToolTip {
  id: string;
  title: string | ReactNode;
  color?: string;
  placement?: string;
}

export interface EditorProps {
  data?: SingleNodeData;
  customizedNodes?: Array<CustomizedNode>;
  toolTips?: Array<ToolTip>;
  contextMenuDisabled?: boolean;
  onNodeDoubleClick?: (id: string) => any;
  onSave?: (data: SingleNodeData) => any;
  dragable?: boolean;
  scalable?: boolean;
}

const DEFAULT_SCALE_RATE = 100;
const MIN_SCALE_RATE = 20;
const MAX_SCALE_RATE = 200;

const Editor: React.FC<EditorProps> = (props) => {
  const {
    data,
    customizedNodes,
    toolTips,
    contextMenuDisabled = false,
    onNodeDoubleClick,
    onSave,
    dragable = true,
    scalable = true,
  } = props;
  const [{ nodeData, nodeDataMap }, dispatch] = useReducer(reducer, {
    nodeData: data,
    nodeDataMap: new Map(),
  });
  const [scaleRate, setScaleRate] = useState(DEFAULT_SCALE_RATE);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const move = (event: any) => {
    if (!dragable) return;
    const containerEl = containerRef!.current!;
    containerEl.style.cursor = 'move';

    const editorEl = editorRef!.current!;
    const x = event.clientX - editorEl.offsetLeft;
    const y = event.clientY - editorEl.offsetTop;
    document.onmousemove = (event) => {
      editorEl.style.left = event.clientX - x + 'px';
      editorEl.style.top = event.clientY - y + 'px';
    };
    document.onmouseup = (event) => {
      containerEl.style.cursor = 'default';
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  const scroll = (event: any) => {
    const wheel = event.wheelDelta || event.detail;
    wheel < 0
      ? setScaleRate((prev) => (prev <= MIN_SCALE_RATE ? prev : prev - 5))
      : setScaleRate((prev) => (prev >= MAX_SCALE_RATE ? prev : prev + 5));

    event.preventDefault();
  };
  const { run: throttledScroll } = useThrottleFn(scroll, { wait: 100 });

  const initEditorPos = () => {
    const containerEl = containerRef!.current!;
    const editorEl = editorRef!.current!;
    const topPos = (editorEl.offsetHeight * (scaleRate / 100 - 1)) / 2;

    editorEl.style.left =
      (containerEl.offsetWidth - editorEl.offsetWidth) / 2 + 'px';
    editorEl.style.top = topPos + 'px';
  };

  useEffect(() => {
    const containerEl = containerRef!.current!;

    initEditorPos();
    dragable && (containerEl.onmousedown = (event) => move(event));
    scalable && containerEl.addEventListener('mousewheel', throttledScroll);

    return () => {
      containerEl.removeEventListener('mousewheel', throttledScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !data && dispatch(addStartNode());
    (customizedNodes || toolTips) &&
      dispatch(updateNodes(customizedNodes, toolTips));
  }, [data, customizedNodes, toolTips]);

  useEffect(() => {
    dispatch(initNodeDataMap(nodeData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = usePersistFn(() => onSave && onSave(nodeData));

  const ScaleController = useMemo(
    () => (
      <Slider
        className="scale-controller"
        value={scaleRate}
        min={MIN_SCALE_RATE}
        max={MAX_SCALE_RATE}
        vertical
        tipFormatter={(value?: number) => `${value}%`}
        onChange={(value: React.SetStateAction<number>) => {
          setScaleRate(value);
        }}
      ></Slider>
    ),
    [scaleRate]
  );

  return (
    <div className="container" ref={containerRef}>
      <Toolbar save={save}></Toolbar>
      <EditorProvider {...{ onNodeDoubleClick, contextMenuDisabled }}>
        <NodeDataProvider {...{ nodeData, nodeDataMap, dispatch }}>
          <div
            className="editor"
            style={{
              transform: `scale(${scaleRate / 100})`,
              position: dragable ? 'absolute' : 'relative',
            }}
            ref={editorRef}
          >
            <SingleNode {...(nodeData as SingleNodeProps)}></SingleNode>
          </div>
        </NodeDataProvider>
      </EditorProvider>
      {scalable && ScaleController}
    </div>
  );
};

export default Editor;
