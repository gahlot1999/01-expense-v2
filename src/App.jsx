import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Budgets from './features/budget/Budgets';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddEditBudget from './features/budget/AddEditBudget';
import Budget from './features/budget/Budget';
import AddEditExpense from './features/expense/AddEditExpense';
import Config from './features/config/Config';
import Categories from './features/config/categories/Categories';
import Home from './features/home/Home';
import SignIn from './features/auth/signin/SignIn';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='home' element={<Home />} />
          <Route path='config' element={<Config />} />
          <Route path='categories' element={<Categories />} />
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
