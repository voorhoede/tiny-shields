# Tiny Badge Maker
[![npm][npm-badge]][npm]

Create SVG badges following the [Shields badge specification](https://github.com/badges/shields/blob/5af5c480db/spec/SPECIFICATION.md).

`npm install tiny-badge-maker`

## API
### tinyBadgeMaker({ label, message, color, labelColor, horizontalPadding })

#### label
Type: `string`

The label text is used on the left side of the badge.

#### message
Type: `string`

The message text is used on the right side of the badge.

#### color
Type: `string`  
Default: `brightgreen`  
Options: `brightgreen`, `green`, `yellowgreen`, `yellow`, `orange`, `red`, `blue`, `grey`, `lightgrey`

Accepts a hex value like `#fff` or one of the options above.

#### labelColor
Type: `string`  
Default: `grey`  
Options: `brightgreen`, `green`, `yellowgreen`, `yellow`, `orange`, `red`, `blue`, `grey`, `lightgrey`

Accepts a hex value like `#fff` or one of the options above.

#### horizontalPadding
Type: `number`
Default: `5`

A positive number that is used as padding in pixels.

[npm]: https://npmjs.com/tiny-badge-maker
[npm-badge]: https://tinyshields.dev/npm/tiny-badge-maker.svg
