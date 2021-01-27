import tinyBadgeMaker from 'tiny-badge-maker';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response(
    tinyBadgeMaker({
      label: 'De Voorhoede',
      message: 'tiny-shields',
      color: '#ffe400',
    }),
    {
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    }
  );
}
