import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import Login from './features/auth/signin/Login';
import SignUp from './features/auth/signup/SignUp';
import Parent from './features/parent/Parent';
import ProtectedRoute from './utils/ProtectedRoute';
import EmiLanding from './features/emi/EmiLanding';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Parent />
              </ProtectedRoute>
            }
          >
            <Route path='home' element={<Home />} />
            <Route path='config' element={<Config />} />
            <Route path='categories' element={<Categories />} />
            <Route path='predefined' element={<p>Predefined Expenses</p>} />
            <Route path='emi' element={<EmiLanding />} />
            <Route path='createbudget' element={<AddEditBudget />} />
            <Route path='editbudget' element={<AddEditBudget />} />
            <Route path='budgets' element={<Budgets />} />
            <Route path='budget/:id' element={<Budget />} />
            <Route path='budget/:id/addexpense' element={<AddEditExpense />} />
            <Route path='budget/:id/editexpense' element={<AddEditExpense />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
