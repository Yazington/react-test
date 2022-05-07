import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/users/silverorange',
});

instance.defaults.timeout = 2500;

export const fetchRepos = async () => {
  const fetchedReposResponse = await instance.get('/repos', {
    headers: {
      ACCEPT: 'application/json',
    },
  });

  return fetchedReposResponse;
};
