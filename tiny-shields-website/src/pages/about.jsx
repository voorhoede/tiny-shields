import { Head, seo } from 'microsite/head';
import Footer from '../components/footer';

export default function AboutPage() {
  return (
    <div class="flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <Head>
        <seo.title>Tiny Shields | About</seo.title>
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>

      <header class="relative flex flex-col items-center w-full max-w-lg py-10">
        <nav>
          <ul class="flex flex-row mb-16">
            <li class="mr-4"><a href="/">Home</a></li>
            <li class="font-semibold"><a href="/about.html">About</a></li>
          </ul>
        </nav>
        <a
          href="https://github.com/voorhoede/tiny-shields"
          class="absolute right-0 mr-6 leading-none text-pink-400 hover:text-pink-500 transition-colors"
        >
          <span class="sr-only">GitHub</span>
          <svg fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6 inline">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd">
            </path>
          </svg>
        </a>
        <h1 class="text-3xl font-semibold">
          <pre>tiny shields</pre>
        </h1>
      </header>

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
