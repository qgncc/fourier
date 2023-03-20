import "./Input.scss";

type InputDefaultProps = JSX.IntrinsicElements["input"];
export interface IInputProps extends InputDefaultProps {}

export function Input(props: IInputProps) {
  return <input {...props} className="input" />;
}
