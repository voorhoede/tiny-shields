// You need to import `h` factory function as Deno Deploy
// uses it instead of `React.createElement`
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";
import { useState } from "https://x.lcas.dev/preact@10.5.12/hooks.js";
import { tw, setup } from "https://cdn.skypack.dev/twind";
import { virtualSheet, getStyleTag } from "https://cdn.skypack.dev/twind/sheets";
import { App } from "./app.jsx";
import { hydro } from "./hydro.js"

const sheet = virtualSheet()

setup({ sheet })

addEventListener("fetch", async (event) => {
  sheet.reset()

  const body = renderToString(<App />);

  const styleTag = getStyleTag(sheet)

  const { pathname } = new URL(event.request.url);
  if (pathname.startsWith("/hydro.js")) {
    console.log('hi')
    const file = await Deno.readFile("./hydro.js");
    // Respond to the request with the style.css file.
    return event.respondWith(new Response(file, {
      headers: {
        "content-type": "application/javascript; charset=utf-8",
      },
    }));
  }

    console.log('hai')
  // renderToString generates html string from JSX components.
  const response = new Response(`<html>
      <head>
      ${styleTag}
      <script>${hydro} hydro()</script>
      </head>
      ${body}
    </html>`, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  event.respondWith(response);
});
