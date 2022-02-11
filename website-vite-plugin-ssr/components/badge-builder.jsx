import { useState, useEffect } from 'preact/hooks';
import { CopyIcon } from './copy-icon';
import services from 'services';

export function BadgeBuilder() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [copiedInput, setCopiedInput] = useState(false);

  useEffect(() => {
    setFilteredServices(Object.entries(services).filter(
      ([key]) => key.startsWith(searchInput.split('/')[0])
    ));
  }, [searchInput]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    navigator.clipboard
      .writeText(`![${filteredServices[0][0]}](${getUrlFromPath(searchInput)})`)
      .then(() => {
        setCopiedInput(true);
        setTimeout(() => setCopiedInput(false), 3000);
      })
      .catch(console.error);
  }

  return (
    <>
      <img
        class="mb-6 h-5"
        src={
          filteredServices.length && searchInput.includes('/')
          ? getUrlFromPath(searchInput)
          : '/assets/dummy-badge.svg'
        }
        alt=""
        id="badgePreview"
        aria-live="polite"
      />
      <form
        class="w-full mb-6 dark:text-black dark:bg-white"
        onSubmit={handleSearchSubmit}
      >
        <label class="relative flex w-full border-pink-400 border-l-2 pl-2 shadow rounded focus-within:ring-1 focus-within:ring-pink-400">
          <span class="sr-only">Search by service</span>
          <input
            class="w-full bg-transparent focus:outline-none "
            value={searchInput}
            onInput={(event) => setSearchInput(event.target.value)}
            aria-controls="servicesList badgePreview"
            autoFocus
          />
          <button class="flex items-center p-2 bg-gray-200 font-semibold hover:bg-gray-300 transition-colors">
            <CopyIcon />
            <span class="ml-1">Copy</span>
          </button>
          <span
            class={`absolute right-2 bottom-full mb-2 transition-opacity dark:text-white ${!copiedInput && 'opacity-0'}`}>
            Copied!
          </span>
        </label>
      </form>
      <ul id="servicesList" aria-live="polite">
        {filteredServices.map(([key, { routes }]) => (
          <li class="flex mb-4">
            <span class="w-32 font-bold text-right">{key}</span>
            <ul class="w-96">
              {Object.keys(routes).map((route) =>
                <li class="">{route}</li>)
              }
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

function getUrlFromPath(path) {
  return `https://tinyshields.dev/${path}.svg`
}
