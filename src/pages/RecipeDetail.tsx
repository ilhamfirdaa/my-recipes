import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

interface Ingredient {
  bahan: [];
  bumbu: [];
}
interface Recipe {
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

const RecipeDefault: Recipe = {
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

function Detail() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>(RecipeDefault)

  const [activeTab, setActiveTab] = useState<number>(1)
  const [isModalActive, setIsModalActive] = useState<boolean>()
  const [isToastActive, setIsToastActive] = useState<boolean>()
  const [toastMessage, setToastMessage] = useState<string>('')

  const fetchRecipeDetail = () => {
    fetch(`https://64abcedc9edb4181202e94ea.mockapi.io/api/recipes/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setRecipe(data)
      });
  }

  useEffect(() => {
    fetchRecipeDetail()
  })

  useEffect(() =>{
    const timer = setTimeout(() => {
      if(isToastActive) {
        setIsToastActive(false)
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isToastActive])

  return (
    <>
      <header className="bg-white top-0 left-0 w-full z-10 fixed">
        <div className="container flex items-center justify-between w-full h-16 p-4">
          {/* back button */}
          <Link to={`/`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className='flex gap-x-2'>
            {/* save button */}
            <button 
              type="button"
              onClick={() => {
                setIsToastActive(true);
                setToastMessage('Bookmarked')
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </button>
            {/* share button */}
            <button 
              type="button" 
              onClick={() => {
                setIsToastActive(true);
                setToastMessage('Shared')
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="pt-16 mb-20">
        <div className="container">
          <div className="w-full overflow-hidden h-80">
            <img src={recipe?.image} alt={recipe?.id} height="320"  />
          </div>

          <div className="px-4 mt-6 flex flex-col gap-y-3">
            <h1 className="font-bold text-3xl">{recipe?.name}</h1>
            <p>{recipe?.description}</p>
          </div>

          <div className="px-4 mt-4 w-full flex justify-between">
            <div className={`w-full text-center py-4 border-b-2 ${activeTab === 1 && "border-b-yellow-400"}`}>
              <button type="button" className={`w-full font-semibold ${activeTab === 1 && "text-yellow-400"}`} onClick={() => setActiveTab(1)}>
                Bahan
              </button> 
            </div>
            <div className={`w-full text-center py-4 border-b-2 ${activeTab === 2 && "border-b-yellow-400"}`}>
              <button type="button" className={`w-full font-semibold ${activeTab === 2 && "text-yellow-400"}`} onClick={() => setActiveTab(2)}>
                Cara Membuat
              </button>
            </div>
          </div>

          {activeTab === 1 &&(
            <div className="px-4 mt-6 w-full flex flex-col gap-y-4">
              <div className='w-full'>
              <h3 className='font-semibold'>Bahan</h3>
                {recipe.ingredients.bahan.length > 0 && (
                  <ul className='list-disc px-4'>
                  {recipe?.ingredients?.bahan?.map(item => (
                    <li className="py-1">{item}</li>
                  ))}
                  </ul>
                )}
              </div>
              <div className='w-full'>
              <h3 className='font-semibold'>Bumbu</h3>
                {recipe.ingredients.bumbu.length > 0 && (
                  <ul className='list-disc px-4'>
                  {recipe?.ingredients?.bumbu?.map(item => (
                    <li className="py-1">{item}</li>
                  ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 2 && (
            <div className="px-4 mt-6 w-full flex flex-col">
              <h3 className='font-semibold'>Cara Membuat</h3>
              <div className='w-full'>
                {recipe.tutorial.length > 0 && (
                  <ol className='list-decimal px-4'>
                  {recipe?.tutorial?.map(item => (
                    <li className="py-1">{item}</li>
                  ))}
                  </ol>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-6 flex w-full justify-evenly z-20">
          <button 
            type="button"
            className="bg-yellow-400 py-2 px-10 rounded-full"
            onClick={() => {
              setIsToastActive(true);
              setToastMessage('Mulai Masak Yuk!')
            }}
          >
            Mulai Masak Yuk
          </button>
          <button type="button" className="bg-yellow-400 p-2 rounded-full" onClick={() => setIsModalActive(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </button>
        </div>
        
        {isToastActive &&
          <div className='absolute bottom-6 w-full flex justify-center z-30'>
            <div className="max-w-xs bg-green-100 border border-green-200 text-sm text-green-500 rounded-md shadow-md" role="alert">
              <div className="flex p-4">
                {toastMessage}
              </div>
            </div>
          </div>
        }

        {isModalActive && (
          <div id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-40 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <div className="relative rounded-lg shadow bg-yellow-100">
                <button type="button" className="float-right pt-2 pr-2" onClick={() => setIsModalActive(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Modal body */}
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed">
                      {recipe.tips}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}


      </section>
    </>
  )
}

export default Detail