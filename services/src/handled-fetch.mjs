export default function handledFetch(input, init) {
  return fetch(input, init)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response;
    })
}
