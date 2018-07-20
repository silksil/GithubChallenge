import axios from 'axios';

export const FETCH_REPOS = 'fetch_repos';

export function fetchRepos(lang, callback) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`);
  return axios.get(encodedURI)
  .then(fetchedData => {
    callback()
    return {
      type: FETCH_REPOS,
      payload: fetchedData,
    };
  });
}
