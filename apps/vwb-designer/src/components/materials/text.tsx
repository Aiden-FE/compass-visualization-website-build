interface TextProps {
  text?: string;
}

export default function Text({ text }: TextProps) {
  return (
    <>
      This is Text material component.
      {text}
    </>
  );
}
