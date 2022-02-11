import { h, Helmet, ssr, tw } from "https://crux.land/nanossr@0.0.1";

const App = ({ name }) => (
  <body class={tw`flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white`}>
    <h1>Hello {name}!</h1>
  </body>
);

addEventListener("fetch", (event) => {
  event.respondWith(ssr(() => <App name="Selwyn" />));
});
