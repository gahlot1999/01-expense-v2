import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './features/landing/Landing';
import Budgets from './features/budget/Budgets';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddEditBudget from './features/budget/AddEditBudget';
import Budget from './features/budget/Budget';
import AddEditExpense from './features/expense/AddEditExpense';
import Config from './features/config/Config';
import CategoriesLanding from './features/config/categories/CategoriesLanding';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='config' element={<Config />} />
          <Route path='categories' element={<CategoriesLanding />} />
          <Route path='createbudget' element={<AddEditBudget />} />
          <Route path='editbudget' element={<AddEditBudget />} />
          <Route path='budgets' element={<Budgets />} />
          <Route path='budgets/:id' element={<Budget />} />
          <Route path='budgets/:id/addexpense' element={<AddEditExpense />} />
          <Route path='budgets/:id/editexpense' element={<AddEditExpense />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
