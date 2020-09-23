import React, { useContext } from 'react';
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
import { nodeDataContext } from '../../reducers';

export interface SingleNodeProps extends NodeProps {
  child?: SingleNodeProps | BranchNodeProps | ConditionNodeProps;
}

const SingleNode: React.FC<SingleNodeProps> = (props) => {
  const { dispatch } = useContext(nodeDataContext);
  const { id, child } = props;

  const handleMenuClick = ({ key }: { key: any }) => {
    const [nodeId, action] = key.split('_');
    console.log(nodeId, action);
    switch (action) {
      case 'add-single-node': {
        dispatch(addSingleNode(nodeId));
        break;
      }
      case 'add-branch-node': {
        dispatch(addBranchNode(nodeId));
        break;
      }
      case 'add-condition-node': {
        dispatch(addConditionNode(nodeId));
        break;
      }
      case 'delete-node': {
        dispatch(deleteNode(nodeId));
        break;
      }
      default:
        break;
    }
  };

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
