import { Button, Flex } from '@chakra-ui/react';
import { Repo } from '../types/Repo';
import RepoItem from './RepoItem';
import React, { useEffect, useMemo, useState } from 'react';
import reposRaw from './temp.json';

const ReposList = () => {
  // const {
  //   data: repos,
  //   isLoading,
  //   error,
  //   isError,
  // } = useQuery('repos', fetchRepos);
  const [clickedLanguages, setClickedLanguages] = useState(new Map());
  const [atLeastOneLanguageSelected, setAtLeastOneLanguageSelected] =
    useState(false);
  const repos = reposRaw as Repo[];

  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    setLanguages(
      (repos as Repo[])
        ?.map((repo: Repo) => repo.language)
        .filter(
          (language: string, index: number, self: any) =>
            self.indexOf(language) === index
        )
    );
  }, [repos]);

  useEffect(() => {
    const oneIsSelected = Array.from(clickedLanguages?.values())?.includes(
      true
    );
    setAtLeastOneLanguageSelected(oneIsSelected);
  }, [clickedLanguages]);

  const handleLanguageClick = (language: string) => {
    setClickedLanguages(
      new Map(clickedLanguages.set(language, !clickedLanguages.get(language)))
    );
  };

  const reposSortedByNewest = useMemo(
    () =>
      repos?.sort((a: Repo, b: Repo) => {
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      }),
    [repos]
  );

  useEffect(() => {
    languages?.map((language: string) => clickedLanguages.set(language, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   return <Flex w="100%">{`There was an error ${error}`}</Flex>;
  // }

  return (
    <Flex direction={'column'} w="100%" align={'center'}>
      <Flex w="100%" justify={'center'} align="center" p="1rem">
        {languages.map((language: string) => (
          <Button
            m="1rem"
            key={language}
            onClick={() => handleLanguageClick(language)}
            backgroundColor={clickedLanguages.get(language) ? 'green' : 'unset'}
          >
            {language}
          </Button>
        ))}
      </Flex>
      <Flex w="90%">
        {!atLeastOneLanguageSelected ? (
          <Flex direction={'column'} w="100%" justify={'center'} align="center">
            {reposSortedByNewest.map((repo: Repo) => (
              <RepoItem key={`main-${repo.url}`} repo={repo} />
            ))}
          </Flex>
        ) : (
          <Flex direction={'column'} w="100%" justify={'center'} align="center">
            {reposSortedByNewest
              .filter((repo: Repo) => clickedLanguages.get(repo.language))
              .map((repo: Repo) => (
                <RepoItem key={`main-${repo.url}`} repo={repo} />
              ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ReposList;
