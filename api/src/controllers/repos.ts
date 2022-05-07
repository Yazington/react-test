import currentRepos from '../../data/repos.json';
import { fetchRepos } from '../services/repos';

export const aggregateRepos = async () => {
  const { data } = await fetchRepos();
  const allRepos = currentRepos.concat(data);
  return allRepos.filter((repo) => !repo.fork);
};
