
export interface Ingredient {
  bahan: [];
  bumbu: [];
}

export interface Recipe {
  id: string;
  createdAt: number;
  name: string;
  description: string;
  rating: number;
  ingredients: Ingredient;
  tutorial: [];
  image: string;
  duration: number;
  tips: string
}

export const RecipeDefault: Recipe = {
  id: '',
  createdAt: 0,
  name: '',
  description: '',
  rating: 0,
  ingredients: {
    bahan: [],
    bumbu: []
  },
  tutorial: [],
  image: '',
  duration: 0,
  tips: ''
}