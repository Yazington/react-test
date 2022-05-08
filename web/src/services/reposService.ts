import axios, { AxiosResponse } from 'axios';
import { GithubCommit } from '../types/GithubCommit';

export const fetchRepos = async () => {
  const response = await axios.get('http://localhost:4000/repos', {
    headers: {
      ACCEPT: 'application/json',
    },
  });

  return JSON.parse(response.data);
};

export const fetchLastCommit = async (commitURL: string) => {
  const commitsListURL = commitURL.replace('{/sha}', '');

  let allCommits: GithubCommit[] = [];

  try {
    allCommits = await axios
      .get(commitsListURL)
      .then<GithubCommit[]>((response: AxiosResponse) => response.data);
  } catch (e) {
    return undefined;
  }

  return allCommits[0]?.commit;
};
