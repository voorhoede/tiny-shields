import prettyBytes from 'pretty-bytes';
import handledFetch from './handled-fetch.mjs';

const sizeHandler = ({
  scope,
  packageName,
  parsedScope = scope ? `${scope}/` : '',
}) => (
  handledFetch(
    `https://bundlephobia.com/api/size?package=${parsedScope}${packageName}`
  )
    .then((response) => response.json())
    .then((data) => ({
      label: 'minified size',
      message: prettyBytes(data.size),
      color: 'blue',
      maxAge: 60 * 60 * 24,
    }))
);

const dependenciesHandler = ({
  scope,
  packageName,
  parsedScope = scope ? `${scope}/` : '',
}) => (
  handledFetch(
    `https://bundlephobia.com/api/size?package=${parsedScope}${packageName}`
  )
    .then((response) => response.json())
    .then((data) => ({
      label: 'dependency count',
      message: String(data.dependencyCount),
      color: 'blue',
      maxAge: 60 * 60 * 24,
    }))
);

const routes = {
  '/size/:packageName': sizeHandler,
  '/size/:scope/:packageName': sizeHandler,
  '/dependencies/:packageName': dependenciesHandler,
  '/dependencies/:scope/:packageName': dependenciesHandler,
};

export default {
  routes,
};
