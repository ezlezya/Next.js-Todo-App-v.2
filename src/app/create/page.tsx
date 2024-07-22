import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function createTodo(formData: FormData) {
  'use server'

  const todo = formData.get('inputForm')?.valueOf()
  if(typeof todo !== 'string' || todo.length === 0) {
    throw new Error("invalid title")
  }
  await fetch('http://localhost:5004/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body: todo, active: false})
  })
  redirect('/')
}

export default function CreatePage() {
  return (
    <main>
      <div className="flex justify-center px-[7%] py-[10px] border-b-2 border-white">
        <h3 className="text-white text-[28px]">Create new todo</h3>
      </div>
      <div className='flex justify-center mt-[7%]'>
        <form action={createTodo}>
          <input type="text" name='inputForm' className='h-[30px] w-[400px] rounded border-2 border-white'/>
          <div className='flex justify-end gap-1 mt-[5px]'>
            <button type='submit' className='border-2 rounded p-[5px] bg-white hover:bg-slate-100 text-green-500 hover:text-green-600'>Create todo</button>
            <Link href="/" className='border-2 rounded p-[5px] bg-white hover:bg-slate-100 text-red-600 hover:text-red-700'>Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  )
}
