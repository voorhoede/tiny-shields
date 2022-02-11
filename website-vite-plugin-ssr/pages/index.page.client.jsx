import { hydrate } from 'preact';
import { getPage } from 'vite-plugin-ssr/client';

import '../global/index.css';

async function hydrateInit() {
  const { Page, pageProps } = await getPage();

  hydrate(<Page {...pageProps} />, document.getElementById('page-view'));
}

hydrateInit();
