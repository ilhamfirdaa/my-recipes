import React from 'react'

export default function Toast(props: {message: string}) {
  return (
    <div className='fixed bottom-12 w-full flex justify-center z-30'>
      <div className="max-w-xs bg-green-100 border border-green-200 text-sm text-green-500 rounded-md shadow-md" role="alert">
        <div className="flex p-4">
          {props.message}
        </div>
      </div>
    </div>
  )
}
