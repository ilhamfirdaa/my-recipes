import React from 'react'
import { Recipe } from '../types'

export default function Modal(props: {recipe: Recipe, handleModal: () => void}) {
  return (
    <div className="fixed z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full max-w-sm m-auto">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow bg-yellow-100">
          <button type="button" className="float-right pt-2 pr-2" onClick={() => props.handleModal()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed">
              {props.recipe.tips}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
