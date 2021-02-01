import { oneLineTrim } from 'common-tags';
import getTextWidth from './get-text-width.mjs';
import escapeXml from './escape-xml.mjs';

const colorPalette = {
  brightgreen: '#4c1',
  green: '#97ca00',
  yellowgreen: '#a4a61d',
  yellow: '#dfb317',
  orange: '#fe7d37',
  red: '#e05d44',
  blue: '#007ec6',
  grey: '#555',
  lightgrey: '#9f9f9f',
};

export default function tinyBadgeMaker({
  label,
  message,
  color = colorPalette.brightgreen,
  labelColor = colorPalette.grey,
  horizontalPadding = 5,
}) {
  if (!color.startsWith('#')) color = colorPalette[color];

  const { renderedText: renderedLabel, width: labelWidth } = renderText({
    leftMargin: 1,
    horizontalPadding,
    content: label,
    color: labelColor,
  });

  const leftWidth = labelWidth + 2 * horizontalPadding;
  const messageMargin = leftWidth - (message.length ? 1 : 0);

  const { renderedText: renderedMessage, width: messageWidth } = renderText({
    leftMargin: messageMargin,
    horizontalPadding,
    content: message,
    color,
  });

  const rightWidth = messageWidth + 2 * horizontalPadding;
  const width = leftWidth + rightWidth;
  const accessibleText = createAccessibleText({ label, message });

  return oneLineTrim`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20" role="img" aria-label="${escapeXml(
    accessibleText
  )}">
      <title>${escapeXml(accessibleText)}</title>
      <linearGradient id="s" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
      </linearGradient>

      <clipPath id="r">
        <rect width="${width}" height="20" rx="3" fill="#fff"/>
      </clipPath>

      <g clip-path="url(#r)">
        <rect width="${leftWidth}" height="20" fill="${labelColor}"/>
        <rect x="${leftWidth}" width="${rightWidth}" height="20" fill="${color}"/>
        <rect width="${width}" height="20" fill="url(#s)"/>
      </g>

      <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        ${renderedLabel}
        ${renderedMessage}
      </g>
    </svg>
  `;
}

function ensureOddNumber(number) {
  return number % 2 === 0 ? number + 1 : number;
}

function preferredTextWidth(text) {
  // Increase chances of pixel grid alignment.
  return ensureOddNumber(getTextWidth(text) | 0);
}

function createAccessibleText({ label, message }) {
  const labelPrefix = label ? `${label}: ` : '';
  return labelPrefix + message;
}

function renderText({ leftMargin, horizontalPadding, content }) {
  const textLength = preferredTextWidth(content);
  const escapedContent = escapeXml(content);

  const outTextLength = 10 * textLength;
  const x = 10 * (leftMargin + 0.5 * textLength + horizontalPadding);

  return {
    renderedText: [
      `<text aria-hidden="true" x="${x}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${outTextLength}">${escapedContent}</text>`,
      `<text x="${x}" y="140" transform="scale(.1)" fill="#fff" textLength="${outTextLength}">${escapedContent}</text>`,
    ].join(''),
    width: textLength,
  };
}
