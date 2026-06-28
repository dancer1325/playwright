type GreetingProps = {
  name: string;
  onGreet?: () => void;
};

// A tiny component with a prop and an event, so the `mount` fixture has
// something meaningful to render and to marshal back across the Node/browser boundary.
export default function Greeting({ name, onGreet }: GreetingProps) {
  return (
    <button type="button" onClick={onGreet}>
      Hello {name}
    </button>
  );
}
