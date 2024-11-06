interface Props {
  total?: number;
  data: {color: string; value: number; legend?: Element}[];
  thickness?: number;
  size?: number;
  children?: React.ReactElement | React.ReactElement[];
}
declare function Donut(props: Props);
export default Donut;
