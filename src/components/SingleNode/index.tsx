import React, { useContext, useMemo } from 'react';
import { Tooltip, Dropdown } from 'antd';
import useContextMenu, { MENU } from '../ContextMenu';
import Link from '../Link';
import { useDrag, useDrop } from 'ahooks';
import renderChildNode from '../../utils/renderChildNode';
import { findNodeById } from '../../utils/findNode';
import {
  nodeDataContext,
  nodeDataDispatchContext,
  editorEventContext,
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
  const { nodeData } = useContext(nodeDataContext);
  const curNodeData = findNodeById(nodeData, id);
  const {
    timestamp,
    child,
    deletable,
    customShape,
    toolTip,
  } = curNodeData as SingleNodeProps;

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
  if (!deletable && !child) {
    menuItems = menuItems.filter((item) => item !== MENU.DELETE_NODE);
  }
  const menu = useContextMenu(id, menuItems);

  const { onNodeDoubleClick } = useContext(editorEventContext);

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
              {customShape ? (
                <div>{customShape}</div>
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
    [timestamp]
  );
};

export default SingleNode;
