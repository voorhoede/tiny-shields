// You need to import `h` factory function as Deno Deploy
// uses it instead of `React.createElement`
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import { tw, setup } from "https://cdn.skypack.dev/twind";
import { virtualSheet, getStyleTag } from "https://cdn.skypack.dev/twind/sheets";

const sheet = virtualSheet()

setup({ sheet })

function App({ name }) {
  return (
      <body class={tw`flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white`}>
        <h1>Hello {name}!</h1>
      </body>
  );
}

addEventListener("fetch", (event) => {
  sheet.reset()

  const body = renderToString(<App name="Selwyn" />)

  const styleTag = getStyleTag(sheet)

  const response = new Response(
    `<html>
      <head>${styleTag}</head>
      ${body}
    </html>`,
    { headers: { "content-type": "text/html; charset=utf-8" }, }
  );

  event.respondWith(response);
});

