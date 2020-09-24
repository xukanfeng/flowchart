import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import { NodeProps } from '../type';
import { BranchNodeProps } from '../BranchNode';
import { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';
import useNodeMenu from '../../hooks/useNodeMenu';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import { editorContext } from '../../reducers';

const MENU_CONFIG = [
  { action: 'add-single-node', desc: '新增子节点' },
  { action: 'add-branch-node', desc: '新增分支节点' },
  { action: 'add-condition-node', desc: '新增条件节点' },
  { action: 'delete-node', desc: '删除当前节点' },
  { action: 'delete-node-and-children', desc: '删除当前节点及子节点' },
];

export interface SingleNodeProps extends NodeProps {
  child?: SingleNodeProps | BranchNodeProps | ConditionNodeProps;
}

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { id, child, customShape } = props;
  let menuConfig = [...MENU_CONFIG];
  if (!child) {
    menuConfig = menuConfig.filter(
      (config) => config.action !== 'delete-node-and-children'
    );
  }
  const menu = useNodeMenu(id, menuConfig);
  const { onNodeDoubleClick } = useContext(editorContext);

  return (
    <div className="single-node-wrapper">
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div onDoubleClick={onNodeDoubleClick && (() => onNodeDoubleClick(id))}>
          {customShape ? (
            <div>{customShape}</div>
          ) : (
            <div className="node"></div>
          )}
        </div>
      </Dropdown>
      {child && <Link></Link>}
      {child && renderChildNode(child)}
    </div>
  );
};

export default SingleNode;
