type ConsoleProps = {
  output: string;
};

export default function Console({ output }: ConsoleProps) {
  return <pre>{output}</pre>;
}
