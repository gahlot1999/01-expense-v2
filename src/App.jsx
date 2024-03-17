import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateBudget from './pages/CreateBudget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/createbudget' element={<CreateBudget />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
