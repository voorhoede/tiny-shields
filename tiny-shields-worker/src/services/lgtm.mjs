import tinyBadgeMaker from 'tiny-badge-maker';

const gradeMapping = {
  'A+': 'brightgreen',
  'A': 'green',
  'B': 'yellowgreen',
  'C': 'yellow',
  'D': 'orange',
};

const languageMapping = {
  'cpp': 'c/c++',
  'csharp': 'c#',
  'javascript': 'js/ts',
};

const routes = [
  '/grade/:language/:host/:user/:repository',
];

function handler({ language, host, user, repository }) {
  return fetch(`https://lgtm.com/api/v0.1/project/${host}/${user}/${repository}/details`)
    .then((response) => response.json())
    .then((data) => {
      const grade = data.languages
        .find((languageContext) => languageContext.lang === language)
        .grade;

      return new Response(
        tinyBadgeMaker({
          label: `code quality: ${languageMapping[language] || language}`,
          message: grade,
          color: gradeMapping[grade],
        }),
        {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': `max-age=${60 * 60 * 8}`,
            'Content-Disposition': 'inline',
          },
        }
      );
    });
}

export default {
  routes,
  handler,
};
