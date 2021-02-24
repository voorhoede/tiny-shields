import { Head, seo } from 'microsite/head';
import Header from '../components/header';
import Footer from '../components/footer';

export default function AboutPage() {
  return (
    <div class="flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <Head>
        <seo.title>Tiny Shields | About</seo.title>
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>

      <Header activePath="/about.html" />

      <main class="max-w-lg">
        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Why?</h2>
        <p class="mb-8">
          The main goal of tiny shields is to make badges as fast and light as possible.
        </p>

        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Highlights</h2>
        <ul class="list-disc mb-8">
          <li class="mb-2">
            Serve badges from Cloudflare Workers with minimal latency.
          </li>
          <li class="mb-2">
            Modern JavaScript, using ECMAScript modules.
          </li>
          <li class="mb-2">
            Small codebase, badge maker is ~150 lines of code.
          </li>
          <li>
            Follows the&nbsp;
            <a class="underline" href="https://github.com/badges/shields/blob/5af5c480db/spec/SPECIFICATION.md">
              Shields badge specification
            </a>.
          </li>
        </ul>

        <h2 class="mb-3 text-2xl border-pink-400 border-l-2 pl-2">Prior Art</h2>
        <p>
          Inspired by&nbsp;
          <a class="underline" href="https://shields.io/">Shields.io</a> and&nbsp;
          <a class="underline" href="https://badgen.net/">Badgen</a>.
        </p>
      </main>

      <Footer />
    </div>
  );
};
