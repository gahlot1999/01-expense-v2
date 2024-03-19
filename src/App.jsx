import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './features/landing/Landing';
import Budgets from './features/budget/Budgets';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddBudget from './features/budget/AddBudget';
import Budget from './features/budget/Budget';
import AddExpense from './features/expense/AddExpense';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/createbudget' element={<AddBudget />} />
          <Route path='/budgets' element={<Budgets />} />
          <Route path='/budgets/:id' element={<Budget />} />
          <Route path='/budgets/:id/addexpense' element={<AddExpense />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
