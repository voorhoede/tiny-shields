import tinyBadgeMaker from 'tiny-badge-maker';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { pathname, searchParams } = new URL(request.url);

  if (pathname === '/dynamic') {
    return fetch(searchParams.get('url'))
      .then(response => response.json())
      .then((data) => (
        new Response(
          tinyBadgeMaker({
            message: data[searchParams.get('query')],
            label: searchParams.get('label'),
            color: searchParams.get('color'),
          }),
          {
            headers: {
              'Content-Type': 'image/svg+xml',
            },
          },
        )
      ));
  }

  return new Response(null, { status: 400 });
}
