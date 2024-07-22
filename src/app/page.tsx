import Image from "next/image";
import Link from "next/link";
import Todos from "./Todos";
import { revalidatePath } from "next/cache";

export type TodosType = {
  body: string,
  active: boolean,
  _id?: string
}

async function activeChange(id: string, status: boolean) {
    'use server'

    await fetch('http://localhost:5004/api/todos', {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: id, active: status})
    })
  }

async function deleteTodo(id: string) {
    'use server'

    await fetch(`http://localhost:5004/api/todos/${id}`, {
      method: "DELETE",
    })
    revalidatePath("/")
  }

export default async function Home() {
  const response = await fetch('http://localhost:5004/api/todos', {
    cache: "no-store"
  })
  const todos: TodosType[] = await response.json()

  return (
    <main>
      <div className="flex justify-between items-center px-[7%] py-[10px] border-b-2 border-white">
        <h3 className="text-white text-[28px]">Todo App</h3>
        <Link className="text-green-500 hover:text-green-600 text-[22px]" href="/create">create todo</Link>
      </div>
      <div className="pt-[2%] flex justify-center">
        <div className="flex-col">
          {
            todos.map((item, index) => {
              return <Todos key={index} {...item} activeChange={activeChange} deleteTodo={deleteTodo}/>
            })
          }
        </div>
      </div>
    </main>
  );
}
