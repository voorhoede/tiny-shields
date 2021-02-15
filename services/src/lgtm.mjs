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

const handler = ({ language, host, user, repository }) => (
  fetch(
    `https://lgtm.com/api/v0.1/project/${host}/${user}/${repository}/details`
  )
    .then((response) => response.json())
    .then((data) => {
      const grade = data.languages.find(
        (languageContext) => languageContext.lang === language
      ).grade;

      return {
        label: `code quality: ${languageMapping[language] || language}`,
        message: grade,
        color: gradeMapping[grade],
      };
    })
);

export default {
  routes,
  handler,
};
