type LabelDefaultProps = JSX.IntrinsicElements["label"];
import "./Label.scss";

export interface ILabelProps extends LabelDefaultProps {}

export function Label({ children, className, ...props }: ILabelProps) {
  className = className ? "label " + className : "label";
  return (
    <label {...props} className={className}>
      {children}
    </label>
  );
}
