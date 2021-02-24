import { Head, seo } from 'microsite/head';
import BadgeBuilder from '../components/badge-builder';
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <div class="flex flex-col items-center min-h-screen px-6 bg-gray-50 dark:bg-gray-800 dark:text-white">
      <Head>
        <seo.title>Tiny Shields</seo.title>
        <link rel="icon" href="/assets/favicon.svg" />
      </Head>

      <Header activePath="/" />

      <main class="flex flex-col items-center w-full max-w-lg">

        <BadgeBuilder />

      </main>

      <Footer />
    </div>
  );
};
