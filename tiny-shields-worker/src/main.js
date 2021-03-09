import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import { exec, match, parse } from 'matchit';
import { flatten } from 'flattenizer';
import tinyBadgeMaker from 'tiny-badge-maker';
import services from 'services';

const cloudflareCache = caches.default;

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const cachedResponse = await cloudflareCache.match(event.request.url);
  if (cachedResponse) {
    return cachedResponse;
  }

  const { pathname, searchParams } = new URL(event.request.url);

  if (pathname === '/live') {
    return fetch(searchParams.get('url'))
      .then((response) => response.json())
      .then((data) => (
        new Response(
          tinyBadgeMaker({
            message: flatten(data)[searchParams.get('query')],
            label: searchParams.get('label'),
            color: searchParams.get('color'),
          }),
          {
            headers: {
              'Content-Type': 'image/svg+xml;charset=utf-8',
              'Cache-Control': `max-age=${60 * 10},immutable`,
              'Content-Disposition': 'inline',
            },
          },
        )
      ));
  }

  if (
    pathname.startsWith('/assets') ||
    !pathname.endsWith('.svg')
  ) {
    return getAssetFromKV(event);
  }

  const { name } = exec(
    pathname,
    match(pathname, [parse('/:name/*')])
  );

  if (!name || !services[name]) {
    return new Response('Invalid service', { status: 400 });
  }

  const routeValues = exec(
    pathname,
    match(pathname, services[name].routes.map((route) =>
      parse(`/:name${route}.svg`)
    ))
  );

  return services[name].handler(routeValues)
    .catch((response) => ({
      label: response.url,
      message: response.statusText,
      color: 'lightgrey',
      status: response.status,
      maxAge: 60,
    }))
    .then(({ label, message, color, status = 200, maxAge }) => {
      const response = new Response(
        tinyBadgeMaker({ label, message, color }),
        {
          status,
          headers: {
            'Content-Type': 'image/svg+xml;charset=utf-8',
            'Cache-Control': `max-age=${maxAge},immutable`,
            'Content-Disposition': 'inline',
          },
        }
      );

      event.waitUntil(cloudflareCache.put(event.request.url, response.clone()));

      return response;
    });
}
