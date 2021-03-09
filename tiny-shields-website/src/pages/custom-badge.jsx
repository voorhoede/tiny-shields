import { Head, seo } from 'microsite/head';
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <div class="flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <Head>
        <seo.title>Tiny Shields</seo.title>
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>

      <Header activePath="/custom-badge.html" />

      <main class="max-w-lg mb-12">
        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Live endpoint</h2>
        <p class="mb-8">
          Create a custom badge from a JSON endpoint using https://tinyshields.dev/live.
        </p>

        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Query parameters</h2>
        <p class="mb-8">
          <div class="mb-1">The live endpoint expects the following query parameters:</div>
          <ul class="list-disc mb-8">
            <li class="mb-2">
              <span class="font-mono">label:</span>
              Label shown on the left side of the badge.
            </li>
            <li class="mb-2">
              <span class="font-mono">url:</span>
              JSON endpoint to fetch data from.
            </li>
            <li class="mb-2">
              <span class="font-mono">query:</span>
              Path to value in JSON data to show on the right side of the badge.
              The query is&nbsp;
              <a class="underline" href="https://github.com/sahellebusch/flattenizer">
                flattened so nested values&nbsp;
              </a>
              can be reached too.
            </li>
            <li>
              <span class="font-mono">color:</span>
              Background color to show on the right side of the badge, accepts a hex value or&nbsp;
              <a class="underline" href="https://github.com/voorhoede/tiny-shields/tree/master/tiny-badge-maker#color">
                one of these colors.
              </a>
            </li>
          </ul>
        </p>

        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Example</h2>
        <p class="mb-4">
          Fetch the npm version tagged as <code>latest</code> for the package <code>microsite</code>:
          https://tinyshields.dev/live?label=npm&url=https://registry.npmjs.org/-/package/microsite/dist-tags&query=latest&color=yellow
        </p>
        <img
          src="https://tinyshields.dev/live?label=npm&url=https://registry.npmjs.org/-/package/microsite/dist-tags&query=latest&color=yellow"
          alt="npm latest tag version"
        />
      </main>

      <Footer />
    </div>
  );
};
