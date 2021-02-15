import { Head, seo } from 'microsite/head';
import { withHydrate } from 'microsite/hydrate';
import { useState } from 'preact/hooks';

export default withHydrate(function HomePage() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div class="h-screen dark:bg-gray-900">
      <Head>
        <meta charset="utf-8" />
        <seo.title>Tiny Shields</seo.title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <header class="flex flex-col items-center mb-8">
        <h1 class="text-4xl font-bold mb-6">Tiny Shields</h1>
      </header>
      <main class="flex justify-center mb-8">
        <input
          class="bg-gray-300"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-controls="servicesList"
          autoFocus
        />
        <ul id="servicesList" aria-live="polite">
        </ul>
      </main>
    </div>
  );
});
