import React, { useContext } from 'react';
import { Tooltip, Dropdown } from 'antd';
import Link from '../Link';
import { useDrag, useDrop } from 'ahooks';
import useNodeMenu, { MENU } from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { editorContext } from '../../reducers';
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
  const { id, child, deletable, customShape, toolTip } = props;

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
  const menu = useNodeMenu(id, menuItems);

  const { dispatch, onNodeDoubleClick } = useContext(editorContext);
  const getDragProps = useDrag();
  const [sourceNodeId] = useDrop({
    onDom: (sourceNodeId: string) => {
      dispatch(swapNodes(sourceNodeId, id));
    },
  });

  return (
    <div className="single-node-wrapper">
      <Tooltip title={!toolTip ? '' : toolTip!.title}>
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
  );
};

export default SingleNode;
