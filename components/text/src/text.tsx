export interface IVwbAtomicTextProps {
  text: string;
}

export default function VwbAtomicText({ text }: IVwbAtomicTextProps) {
  return <div className="vwb-atomic-text">{text}</div>;
}
