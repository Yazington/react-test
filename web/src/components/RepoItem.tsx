import { Flex } from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { fetchLastCommit } from '../services/reposService';
import { Repo } from '../types/Repo';
import { Commit } from '../types/GithubCommit';

interface RepoProps {
  repo: Repo;
}

const RepoItem: FunctionComponent<RepoProps> = ({ repo }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [commit, setCommit] = useState<Commit | undefined>();

  const handleRepoClick = () => {
    fetchLastCommit(repo.commits_url)
      .then(setCommit)
      .then(() => setOpened(!opened));
  };

  return (
    <Flex
      as="button"
      w="100%"
      direction={'column'}
      justify={'center'}
      align="center"
      p="1rem"
      m="0.5rem"
      backgroundColor={'gray.700'}
      borderRadius="lg"
      _hover={{ backgroundColor: 'gray.600' }}
      onClick={handleRepoClick}
    >
      <Flex w="100%" justify={'center'} align="center">
        <Flex w="40%" justify={'center'}>
          {repo.name}
        </Flex>
        <Flex w="40%" justify={'center'}>
          {repo.description}
        </Flex>
        <Flex w="10%" justify={'center'}>
          {repo.language}
        </Flex>
        <Flex w="10%" justify={'center'}>
          {repo.forks_count}
        </Flex>
      </Flex>
      {opened && commit && (
        <Flex
          w="90%"
          justify={'space-evenly'}
          direction={'column'}
          p="2rem"
          m="1rem"
          borderWidth={'1px'}
          borderRadius="lg"
        >
          <Flex grow={1} fontWeight="bold">
            {commit?.author.name}
          </Flex>
          <Flex grow={1}>
            {new Date(commit?.author?.date ?? '')?.toDateString()}
          </Flex>
          <Flex grow={1} py="0.5rem">
            {'>'} {commit?.message}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default RepoItem;
