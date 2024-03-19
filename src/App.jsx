import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateBudget from './pages/CreateBudget';
import Budgets from './pages/Budgets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/createbudget' element={<CreateBudget />} />
        <Route path='/budgets' element={<Budgets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
