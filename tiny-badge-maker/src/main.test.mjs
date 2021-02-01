import assert from 'assert';
import tinyBadgeMaker from './main.mjs';

assert.strictEqual(
  tinyBadgeMaker({
    label: 'sharks',
    message: 'in the water'
  }),
  '<svg xmlns="http://www.w3.org/2000/svg" width="124" height="20" role="img" aria-label="sharks: in the water"><title>sharks: in the water</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="124" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="47" height="20" fill="#555"/><rect x="47" width="77" height="20" fill="#4c1"/><rect width="124" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="245" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">sharks</text><text x="245" y="140" transform="scale(.1)" fill="#fff" textLength="370">sharks</text><text aria-hidden="true" x="845" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="670">in the water</text><text x="845" y="140" transform="scale(.1)" fill="#fff" textLength="670">in the water</text></g></svg>',
  'uses default arguments'
);

assert.strictEqual(
  tinyBadgeMaker({
    label: 'sharks',
    message: 'airborne',
    color: '#000',
    labelColor: '#fff',
    horizontalPadding: 7,
  }),
  '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="20" role="img" aria-label="sharks: airborne"><title>sharks: airborne</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="112" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="51" height="20" fill="#fff"/><rect x="51" width="61" height="20" fill="#000"/><rect width="112" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110"><text aria-hidden="true" x="265" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="370">sharks</text><text x="265" y="140" transform="scale(.1)" fill="#fff" textLength="370">sharks</text><text aria-hidden="true" x="805" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="470">airborne</text><text x="805" y="140" transform="scale(.1)" fill="#fff" textLength="470">airborne</text></g></svg>',
  'uses given colors and padding arguments'
);
