import '@/assets/scss/index.scss';
//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import AuthListener from '@/AuthListener';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthListener />
  </QueryClientProvider>
  //</StrictMode>
);
