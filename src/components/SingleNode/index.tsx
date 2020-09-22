import React from 'react';
import { Menu, Dropdown } from 'antd';
import { NodeProps } from '../type';
import { BranchNodeProps } from '../BranchNode';
import { ConditionNodeProps } from '../ConditionNode';
import Link from '../Link';
import renderChildNode from '../../utils/renderChildNode';
import './index.scss';
import {
  addSingleNode,
  addBranchNode,
  addConditionNode,
  deleteNode,
} from '../../actions';

export interface SingleNodeProps extends NodeProps {
  type?: String;
  child?: SingleNodeProps | BranchNodeProps | ConditionNodeProps;
}

const handleMenuClick = ({ key }: { key: any }) => {
  const [nodeId, action] = key.split('_');
  console.log(action)
  switch (action) {
    case 'add-single-node': {
      addSingleNode(nodeId);
      break;
    }
    case 'add-branch-node': {
      addBranchNode(nodeId);
      break;
    }
    case 'add-condition-node': {
      addConditionNode(nodeId);
      break;
    }
    case 'delete-node': {
      deleteNode(nodeId);
      break;
    }
    default:
      break;
  }
};

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { id, child } = props;
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={`${id}_add-single-node`}>新增子节点</Menu.Item>
      <Menu.Item key={`${id}_add-branch-node`}>新增分支节点</Menu.Item>
      <Menu.Item key={`${id}_add-condition-node`}>新增条件节点</Menu.Item>
    </Menu>
  );
  return (
    <div className="single-node-wrapper">
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div className="node"></div>
      </Dropdown>
      {child && <Link></Link>}
      {child && renderChildNode(child)}
    </div>
  );
};

export default SingleNode;
