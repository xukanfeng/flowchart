import React, { useContext } from 'react';
import { Tooltip, Dropdown } from 'antd';
import Link from '../Link';
import { useDrag, useDrop } from 'ahooks';
import useNodeMenu from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import { editorContext } from '../../reducers';
import { swapNodes } from '../../actions';
import { SingleNodeProps } from '../../Editor';
import './index.scss';

const MENU_CONFIG = [
  { action: 'add-single-node', desc: '新增子节点' },
  { action: 'add-branch-node', desc: '新增分支节点' },
  { action: 'add-condition-node', desc: '新增条件节点' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'delete-children', desc: '删除子节点' },
  { action: 'delete-node-and-children', desc: '删除当前节点及子节点' },
];

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { id, child, deletable, customShape, toolTip } = props;

  let menuConfig = [...MENU_CONFIG];
  if (!child) {
    menuConfig = menuConfig.filter(
      (config) =>
        config.action !== 'delete-children' &&
        config.action !== 'delete-node-and-children'
    );
  }
  if (child || child === null) {
    menuConfig = menuConfig.filter(
      (config) => config.action !== 'add-branch-node'
    );
  }
  if (!deletable) {
    menuConfig = menuConfig.filter(
      (config) => config.action !== 'delete-node-and-children'
    );
  }
  if (!deletable && !child) {
    menuConfig = menuConfig.filter((config) => config.action !== 'delete-node');
  }

  const menu = useNodeMenu(id, menuConfig);
  const { dispatch, onNodeDoubleClick } = useContext(editorContext);
  const getDragProps = useDrag();
  const [sourceNodeId] = useDrop({
    onDom: (sourceNodeId: string) => {
      dispatch(swapNodes(sourceNodeId, id));
    },
  });

  return (
    <div className="single-node-wrapper">
      <Tooltip title={!toolTip ? "" : toolTip!.title}>
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <div
            onDoubleClick={onNodeDoubleClick && (() => onNodeDoubleClick(id))}
            {...getDragProps(id)}
            {...sourceNodeId}
          >
            {customShape ? (
              <div>{customShape}</div>
            ) : (
              <div className="node">{id}</div>
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
