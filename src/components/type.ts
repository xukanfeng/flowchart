export interface NodeData {
  id: string;
  name?: string;
  properties?: object;
  children?: Array<NodeData>;
}
