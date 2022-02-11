import { h, render } from "https://x.lcas.dev/preact@10.5.12/mod.js"
// import {App} from "./app.jsx"

export function hydro() {
  console.log(1)
if (typeof document !== "undefined") {
  console.log(2)
  render(h('div', null, 'hi'), window.document?.body);
}
}
