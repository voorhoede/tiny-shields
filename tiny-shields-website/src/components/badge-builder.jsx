import { useState } from 'preact/hooks';
import { withHydrate } from 'microsite/hydrate';
import services from 'services';

export default withHydrate(function BadgeBuilder() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <img
        class="mb-6 h-5"
        src={`https:/tinyshields.dev/${searchInput}`}
        id="badgePreview"
        aria-live="polite"
      />
      <label class="flex w-full p-2 mb-6 dark:text-black dark:bg-white border-pink-400 border-l-2 pl-2 shadow rounded">
        https://tinyshields.dev/
        <input
          class="w-full bg-transparent"
          value={searchInput}
          onInput={(event) => setSearchInput(event.target.value)}
          aria-controls="servicesList badgePreview"
          autoFocus
        />
      </label>
      <ul id="servicesList" aria-live="polite">
        {Object.entries(services).filter(([key]) => key.startsWith(searchInput.split('/')[0])).map(([key, { routes }]) => (
          <li class="flex mb-4">
            <span class="w-32 font-bold text-right">{key}</span>
            <ul class="w-96">
              {routes.map((route) =>
                <li class="">{route}</li>)
              }
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
});
