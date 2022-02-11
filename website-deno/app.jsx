import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { useState } from "https://x.lcas.dev/preact@10.5.12/hooks.js";
import { tw } from "https://cdn.skypack.dev/twind";

export function App() {
  const [value, setValue] = useState(0);

  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body class={tw`flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white`}>
        <h1>Hello world</h1>
      <div>Counter: {value}</div>
      <button onClick={() => setValue(value + 1)}>Increment</button>
      <button onClick={() => setValue(value - 1)}>Decrement</button>
      </body>
    </html>
  );
}
