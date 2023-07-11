import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
