import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './features/landing/Landing';
import Budgets from './features/budget/Budgets';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddBudget from './features/budget/AddBudget';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/createbudget' element={<AddBudget />} />
          <Route path='/budgets' element={<Budgets />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
