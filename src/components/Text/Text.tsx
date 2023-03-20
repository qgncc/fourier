import "./Text.scss";

export interface ITextProps {
  children: React.ReactNode;
}

export function Text({ children }: ITextProps) {
  return <p className="text">{children}</p>;
}
