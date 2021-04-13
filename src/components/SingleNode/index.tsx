import React, { useContext, useMemo, useRef, useEffect } from 'react';
import { Tooltip, Dropdown } from 'antd';
import useContextMenu, { MENU } from '../ContextMenu';
import Link from '../Link';
import { useDrag, useDrop } from 'ahooks';
import renderChildNode from '../../utils/renderChildNode';
import {
  nodeDataContext,
  nodeDataDispatchContext,
  editorEventContext,
  editorPropsContext,
} from '../../context';
import { swapNodes } from '../../actions';
import { SingleNodeProps } from '../../Editor';
import '../style.scss';
import './index.scss';

const MENU_ITEMS = [
  MENU.ADD_SINGLE_NODE,
  MENU.ADD_BRANCH_NODE,
  MENU.ADD_CONDITION_NODE,
  MENU.DELETE_NODE,
  MENU.DELETE_CHILDREN,
  MENU.DELETE_NODE_AND_CHILDREN,
];

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { id } = props;
  const { nodeDataMap } = useContext(nodeDataContext);
  const curNodeData = useRef({})
  useEffect(() => {
    curNodeData.current = nodeDataMap.get(id) || props;
    console.log(id, curNodeData.current);
  })
  // curNodeData.current = nodeDataMap.get(id) || props; // the map maybe empty when the editor rendered for the first time
  const {
    isRoot,
    timestamp,
    child,
    deletable,
    customShape,
    toolTip,
  } = curNodeData.current as SingleNodeProps;

  let menuItems = [...MENU_ITEMS];
  if (!child) {
    menuItems = menuItems.filter(
      (item) =>
        item !== MENU.DELETE_CHILDREN && item !== MENU.DELETE_NODE_AND_CHILDREN
    );
  }
  if (child || child === null) {
    menuItems = menuItems.filter((item) => item !== MENU.ADD_BRANCH_NODE);
  }
  if (!deletable) {
    menuItems = menuItems.filter(
      (item) => item !== MENU.DELETE_NODE_AND_CHILDREN
    );
  }
  if ((!deletable && !child) || isRoot) {
    menuItems = menuItems.filter((item) => item !== MENU.DELETE_NODE);
  }
  const menu = useContextMenu(id, menuItems);

  const { onNodeDoubleClick, onCustomizedEvent } = useContext(
    editorEventContext
  );
  const { customizedNodes } = useContext(editorPropsContext);
  const customizedNode = customizedNodes && customizedNodes.get(id);

  const dispatch = useContext(nodeDataDispatchContext);
  const getDragProps = useDrag();
  const [sourceNodeId] = useDrop({
    onDom: (sourceNodeId: string) => {
      dispatch(swapNodes(sourceNodeId, id));
    },
  });

  return useMemo(
    () => (
      <div className="single-node-wrapper">
        <Tooltip title={!toolTip ? '' : toolTip.title}>
          <Dropdown overlay={menu} trigger={['contextMenu']}>
            <div
              onDoubleClick={onNodeDoubleClick && (() => onNodeDoubleClick(id))}
              {...getDragProps(id)}
              {...sourceNodeId}
            >
              {customizedNode ? (
                typeof customizedNode.component === 'function' ? (
                  <div>
                    {(customizedNode.component as React.FC<any>)({
                      id,
                      onCustomizedEvent,
                      ...customizedNode.props,
                    })}
                  </div>
                ) : (
                  <div>{customizedNode.component}</div>
                )
              ) : (
                <div className="node rect">{id}</div>
              )}
            </div>
          </Dropdown>
        </Tooltip>
        {child && <Link></Link>}
        {child && renderChildNode(child)}
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, curNodeData.current, customizedNode]
  );
};

export default SingleNode;
