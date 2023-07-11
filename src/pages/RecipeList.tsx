import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const fetchRecipeData = () => {
    fetch("https://64abcedc9edb4181202e94ea.mockapi.io/api/recipes")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRecipes(data)
      });
  }

  useEffect(() => {
    fetchRecipeData()
  }, [])
  

  return (
    <div className="container">
      <div className="flex flex-wrap p-4">
        {recipes.length > 0 && (
            recipes.map(recipe => (
              <div key={recipe.id} className="w-1/2 p-2">
                <Link to={`/recipe/${recipe.id}`}>
                  <div className="overflow-hidden h-40">
                    <img src={recipe.image} alt={recipe.id} width="160" height="160"  />
                  </div>
                  <div className="flex">
                    <h6 className="font-semibold">{recipe.name}</h6>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 float-right">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3 mr-1 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-700">{recipe.duration}</span>
                  </div>
                </Link>
              </div>
            ))
        )}    
      </div>
    </div>
  );
}

export default App;
