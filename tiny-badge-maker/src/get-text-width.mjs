import binarySearch from 'binary-search';
import verdanaTable from './verdana-table.mjs';

const emWidth = widthOf('m');

export default function getTextWidth(text) {
  return widthOf(text);
}

function widthOf(text) {
  return Array.from(text).reduce((accumWidth, character) => {
    const characterWidth = widthOfCharacterCode(character.codePointAt(0));
    if (characterWidth === undefined) {
      return accumWidth + emWidth;
    } else {
      return accumWidth + characterWidth;
    }
  }, 0);
}

function widthOfCharacterCode(characterCode) {
  if (isControlCharacterCode(characterCode)) {
    return 0;
  }

  const index = binarySearch(
    verdanaTable,
    characterCode,
    ([lower], needle) => lower - needle
  );
  if (index >= 0) {
    // The index matches the beginning of a range.
    const [, , width] = verdanaTable[index];
    return width;
  } else {
    // The index does not match the beginning of a range, which means it
    // should be in the preceeding range A return value of `-x` means the
    // needle would be at `x - 1`, and we want to check the element before
    // that.
    const candidateIndex = -index - 2;
    const [lower, upper, width] = verdanaTable[candidateIndex];
    if (characterCode >= lower && characterCode <= upper) {
      return width;
    } else {
      return undefined;
    }
  }
}

function isControlCharacterCode(characterCode) {
  return characterCode <= 31 || characterCode === 127;
}
