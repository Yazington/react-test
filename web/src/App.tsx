import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReposList from './components/ReposList';

const queryClient = new QueryClient();

export const App = () => (
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <ReposList />
    </QueryClientProvider>
  </ChakraProvider>
);
