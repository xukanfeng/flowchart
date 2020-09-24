export interface NodeProps {
  id: string;
  name?: string;
  type: string;
  visible: boolean;
  customShape?: JSX.Element;
}
