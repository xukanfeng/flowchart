import React, { useState, useEffect } from 'react';
import Editor from '../../Editor';
import { Modal, Form, Input, Button } from 'antd';
import './index.scss';

const GeneralNode: React.FC<any> = (props) => {
  const { title, id, onCustomizedEvent } = props;

  const handleEditBtnClick = () => {
    onCustomizedEvent &&
      onCustomizedEvent({ type: 'edit-btn-clicked', payload: { id } });
  };

  return (
    <div className="start-node-container">
      <div className="start-node-header">
        <div className="start-node-header__title">{title}</div>
        <Button
          className="start-node-header__button"
          onClick={handleEditBtnClick}
        >
          edit
        </Button>
      </div>
    </div>
  );
};

const Demo: React.FC<any> = (props) => {
  const [nodeData, setNodeData] = useState();
  const [nodeDataMap, setNodeDataMap] = useState();
  const [customizedNodes, setCustomizedNodes] = useState(new Map());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curNodeId, setCurNodeId] = useState('');
  const [form] = Form.useForm();
console.log('### Demo');
  useEffect(() => {
    // save nodeData to localstorage or server
    console.log("nodeData", nodeData);
  }, [nodeData]);

  useEffect(() => {
    console.log('nodeDataMap', nodeDataMap);
    const customizedNodes = new Map();
    nodeDataMap &&
      nodeDataMap.forEach((node: any) => {
        const customizedNode: any = {};
        customizedNode.component = GeneralNode;
        customizedNode.props = {};
        customizedNodes.set(node.id, customizedNode);
        console.log('###', customizedNodes);
        setCustomizedNodes(customizedNodes);
      });
  }, [nodeDataMap]);

  const handleUpdate = (data: any) => {
    console.log('handleUpdate', data);
    setNodeDataMap(new Map(data));
  };

  const handleCustomizedEvent = (params: any) => {
    console.log('handleCustomizedEvent', params);
    const { type, payload } = params;
    switch (type) {
      case 'edit-btn-clicked': {
        setCurNodeId(payload.id);
        setIsModalVisible(true);
        break;
      }
      default:
        break;
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const customizedNode = customizedNodes.get(curNodeId);
    customizedNode.component = GeneralNode;
    customizedNode.props = { title: form.getFieldValue('nodeName') };
    setCustomizedNodes(customizedNodes.set(curNodeId, customizedNode));
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <Editor
        data={undefined}
        onSave={(data) => setNodeData({ ...data })}
        onUpdate={handleUpdate}
        onCustomizedEvent={handleCustomizedEvent}
        // customizedNodes={customizedNodes}
      />
      <Modal
        title="Edit"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="nodeName" rules={[{ required: true }]}>
            <Input placeholder="please input the node name"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Demo;
